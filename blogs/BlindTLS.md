---
title: Making TLS-based censorship avoidance faster - BlindTLS?
author: "Murali Krishna"
date: '2024-12-30'
language: 'en'
tags: ['Blog', 'Paper-Reading', 'TLS', 'Censorship-Avoidance']
excerpt: "Internet Censorship is a thing. There's many mechanisms by which this censorship happens, one of which is via inspecting the supposedly unbreakable TLS Handshake itself. Read on to learn about a system to bypass this entirely, at breakneck speeds!"
draft: false
---

*Originally from [https://www.murali.fyi/ramblings/paper-reading/blindtls/](https://www.murali.fyi/ramblings/paper-reading/blindtls/).*

*(This requires atleast a somewhat basic understanding of the TLS Handshake process and the role of certificates in it.)*

### TLS Censorship

TLS Censorship is a thing. Trust me, it is. (You don't? Fine, here's some sources: [1](https://www.bleepingcomputer.com/news/security/south-korea-is-censoring-the-internet-by-snooping-on-sni-traffic/),[2](https://support.sophos.com/support/s/article/KBA-000004538?language=en_US),[3](https://library.oapen.org/bitstream/handle/20.500.12657/26091/1/1003995.pdf) 🙂). 

Governments worldwide (The Great Firewall of China, for example) limit which websites their citizens can visit, and they have a whole toolbox of censorship techniques for different types of internet traffic. One of their favorite tricks for HTTPS traffic is peeking at the *TLS handshake*, which, you might be surprised to learn, leaks the domain you're trying to reach. This is the one we'll be focussing on in this post.

#### Server Name Indication (SNI)
The TLS handshake (both the 1.2 and 1.3 variants) utilize a field in the *ClientHello* called the **SNI**, popularized back when the internet was transitioning from a 'one-website-a-server' paradigm to a 'multiple-websites-a-server' one (*Content Delivery Networks!*). 

With the former, when you resolve the server's IP via DNS to perform a TLS handshake with (and send your ClientHello), the server knows exactly which website's certificate to present, since there's only one that it's hosting anyway. With the latter (and without SNI), the server has no idea which of the many certificates it holds (corresponding to the many domains it hosts) to present to you, since it doesn't know what website you're trying to connect to.

The SNI tells the server this exact information, alongside the ClientHello.
![SNI!](https://site-images.pages.dev/images/blogs/BlindTLS/SNI.jpg "Align=center,Width=60%")
<p align="center">
  <i>Source: https://www.wallarm.com/what/what-is-server-name-indication-sni</i>
</p>

If you're an observant reader however, you may have realised that we haven't actually performed our TLS handshake yet when sending the ClientHello - which means that SNI data is **not encrypted**. This means that any man-in-the-middle *can read your SNI*, and by extension, know which website you're trying to connect to. 

This is exactly what censors exploit - they figure out you're trying to connect to an objectionable website by reading your SNI, and drop your connection (more information on how they do that is [here](https://arxiv.org/html/2502.14945v1)).

#### Virtual Private Networks (VPNs)

VPNs and trusted proxies offer a reprieve. VPNs essentially 'tunnel' your internet traffic to 'middlemen' nodes and encrypt it using a public-private keypair that both you and the VPN share. This means that your Internet Service Provider (ISP) or government can now only see that there's encrypted traffic being sent to a VPN, but not the fact that the traffic in question is a ClientHello packet with your SNI exposed.
![VPN!](https://site-images.pages.dev/images/blogs/BlindTLS/VPN.png "Align=center,Width=60%")
<p align="center">
  <i>Source: https://medium.com/@hnasr/how-vpns-really-work-a5da843d0eb3</i>
</p>

The biggest problem with using a VPN however, is **latency**. The VPN nodes have to use their bandwidth to both receive your traffic, and make requests on your behalf. On top of this, they tend to need to be based in a different country, if you're trying to bypass nation-state censorship.

### BlindTLS

The [*BlindTLS*](https://sambhav.info/files/blindtls-foci21.pdf) system comes up with an extremely neat little solution to bypass TLS-SNI based censorship, without having to tunnel **most** of your actual traffic at all. To do this, it exploits a little quirk in the TLS 1.2 standard's definition of **TLS Session Resumption**.

#### TLS Session Resumption

Resumption is a method to make the TLS handshaking process between a client and server who've already connected before, faster. Vanilla handshaking is a computationally expensive process - generating a secure private key and authenticating certificates takes a while. So when a TLS connection is established and the connection is secure, the server sends a *'ticket'* unique to this client, server and connection triad. The client can present this ticket *alongside* the ClientHello the next time it's trying to connect. Importantly, this ticket is unintelligble to anyone but the server.

![Resumption.](https://site-images.pages.dev/images/blogs/BlindTLS/Resumption.png "Align=center,Width=90%")
<p align="center">
  <i>Source: https://blog.cloudflare.com/microsoft-tls-downgrade-schannel-bug/</i>
</p>

The server can then either lookup this ticket and 'resume' the old session, or use that ticket to bypass some computations and create a new secure connection. The key thing to note here is that there is no need for the server to present a **certificate** while performing resumption - rendering SNI unnecessary while resuming.

#### How BlindTLS works

BlindTLS exploits this lack of necessity for a certificate during resumption. The fundamental steps are:

1. Use a VPN to resolve the server and perform the initial TLS handshake with the censored domain.
2. Obtain a session ticket for the domain.
3. Exit the VPN tunnel, and simply use the session ticket to resume a TLS handshake with the server we resolved the address of with the VPN, with the **caveat** that the SNI in the ClientHello is modified to be a *random, non-censored domain.*

The logic is that during resumption the SNI field is in effect ignored, and we can get away with it being anything. ISPs looking to see if the SNI is censored are then fooled into allowing it through.

![BlindTLS.](https://site-images.pages.dev/images/blogs/BlindTLS/BlindTLS.png "Align=center")
<p align="center">
  <i>Taken straight from the BlindTLS paper!</i>
</p>

That's it! Once the handshake succeeds, the connection with the censored domain is secure, and the ISP has no idea what traffic is being exchanged. No need to wait for your packets to go through the entire VPN tunnel process at all!

### Try it yourself!

1. Install a VPN
2. Create a request.txt as so:

  ```bash {style=emac}
  GET /<url> HTTP/1.1
  Host: <sni>

  GET /<url> HTTP/1.1
  Host: <sni>
  Connection: close
  ```
3. Connect to your VPN
4. Use `dig` to resolve the IP Address of the blocked domain
5. Use `openssl s_client` to connect to the server, and time it twice. (The second one is what BlindTLS optimizes) 
```bash {style=emac}
cat request.txt | openssl s_client -ign_eof -tls1_2 -connect <Resolved IP>:443 -servername <blocked_sni> -sess_out ses.pem > output
```
6. Exit your VPN
7. Use `openssl s_client` to connect to the server, and time it once, using the previously saved session (ticket). 
```bash {style=emac}
cat request.txt | openssl s_client -ign_eof -tls1_2 -connect <Resolved IP>:443 -servername <unblocked_sni> -sess_in ses.pem > output
```

In my experiments, I saw between 2x-4x speedups!

### But...

There are a few caveats to this; the biggest one being its *incompatibility with TLS 1.3*, because of its inexplicable protocol decision to enforce the same SNI in both vanilla and resumed ClientHello's. Another is that this technique is still fingerprintable, by 'actively probing' - i.e hit the 'fake' domain name's server and see if it actually serves that fake domain. If it doesn't, we know it was likely a censorship evasion attempt.

However, the sheer simplicity of the approach still makes it incredibly cool, and if adapted to TLS 1.3, could be game-changing, especially given the slow adoption and development of other similar evasion techniques like [*Encrypted Client Hello*](https://blog.cloudflare.com/encrypted-client-hello/).