---
author: "Murali Krishna"
title: Avoiding QUIC based censorship - QUICStep?
date: '2025-06-15'
language: 'en'
tags: ['Blog', 'Paper-Reading', 'QUIC', 'Censorship-Avoidance']
draft: false
---

*Originally from [https://www.murali.fyi/ramblings/paper-reading/quicstep/](https://www.murali.fyi/ramblings/paper-reading/quicstep/).*

*(This requires atleast a somewhat basic understanding of QUIC. Also, I recommend you read the blog post about BlindTLS first!)*

**Please read the section TLS Censorship in the [BlindTLS](/blog/BlindTLS) post first!**

Once you've done that, carry on :)

### QUICStep

The [QUICStep](https://arxiv.org/pdf/2304.01073) system comes up with an extremely neat little solution to bypass TLS-SNI based censorship, without having to tunnel **most** of your actual traffic at all. To do this, it exploits a very cool feature inherent to the standardised IETF-QUIC protocol called **connection migration**.

#### Connection Migration

Over traditional TCP, a common inefficiency is what's known as the **'parking lot problem'**, named after the easiest example to visualise. Think of it as so:

1. You're in your office, in an important meeting about cutting another 10% of your workforce and replacing them with AI to make 1% more profit, and increase share value to benefit your stakeholders.
2. You realise you're late for your anniversary dinner with your spouse. But you really really have to listen in on this meeting because if you don't, the stakeholders will be furious and the world will end. So you start walking out of your office, beyond the range of your office wi-fi.
3. Once you're too far gone, your phone auto-switches to mobile data. However, in the time that the switch happens, you lose connection - and you miss a key detail about how to make more money. You reconnect, but it's too late. You've missed the detail, and now the company's revenue is going to tank, the world will end, and it's all your fault.

This super catastropic scenario happened because TCP relies on the unchangingness of the quad-tuple of \[Source-IP, Source-Port, Destination-IP, Destination-Port]. By walking beyond the office wi-fi's range, your IP Address (and potentially port) has changed, breaking your underlying TCP connection. To reconnect to your meeting, you had to establish a *new* TCP connection, costing you precious time and in this case, causing the end of the world.

![TCP's reconnection problem](/img/tcp-reconnect.png "Align=center,Width=50%")
<p align="center">
  <i>Source: https://pulse.internetsociety.org/blog/how-quic-helps-you-seamlessly-connect-to-different-networks/</i>
</p>

The way QUIC avoids this is armageddon is via *connection migration*. QUIC does not rely *only* on the above quad-tuple; instead, it assigns a *set of 'connection IDs'* for each connection, exchanged *post* handshake. Anytime a client changes the network through which it is contacting the server (and hence, its IP address), it uses the 'next CID' in the set to identify itself. Since these CIDs were communicated over a secure QUIC connection *after* the handshake was completed, this set of CIDs is completely unknown to anyone but the client and server! This is very analogous to the concept of Session Tickets. (This explanation is heavily oversimplified, but the concept is enough to understand the beauty behind QUICStep!)

![QUIC's connection migration](/img/quic-migration.png "Align=center,Width=50%")
<p align="center">
  <i>Source: https://pulse.internetsociety.org/blog/how-quic-helps-you-seamlessly-connect-to-different-networks/</i>
</p>

#### How QUICStep works

In a nutshell, the concept behind QUICStep is to initiate your QUIC connection to the censored domain via a VPN or trusted proxy, and then *migrate* it to your vanilla, direct path.

![QUICStep](/img/quicstep.png "Align=center")
<p align="center">
  <i>Taken straight from the QUICStep paper!</i>
</p>

The QUICStep [PoC](https://github.com/inspire-group/quicstep) makes this process incredibly easy too! 

0. Setup your encrypted tunnel/VPN - the paper's [PoC](https://github.com/inspire-group/quicstep) uses WireGuard. 
1. Add a *routing rule* via `ip rule` to route all DNS queries via an encrypted tunnel of your choosing.
2. Add a rule that routes *only* QUIC handshake packets (long-header QUIC packets) through the encrypted tunnel, with the rest going through normal paths. This auto-triggers migration once the handshake via the tunnel completes and the application data ends up going through normal paths.

This means that no manual routing or VPN setups are necessary at all!

### But...

There are a few caveats to this; the biggest one being the neccessity for the QUIC implementations on both the client *and* server to support *connection migration*. Despite being specified in the standard itself, not all QUIC implementations actually support migration.

To me, QUICStep draws inspiration *from* BlindTLS - substituting the resumption mechanism for migration. Both these papers are interesting to me in that they use a feature intended to make the protocol convenient, to bypass censorship - and they do so in an incredibly simple manner. This, to me, is the epitome of a 'hacking' culture - not the 'break into cybersystems' kind, but the 'repurpose an existing thing for an entirely different purpose' kind, and the kind of culture I'd love to inculcate. 