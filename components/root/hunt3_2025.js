export default function Hunt3Video({ onEnded }) {
    return (
        <div className="flex justify-center items-center w-full">
            <video className="w-[90%]" autoPlay muted onEnded={onEnded}>
                <source src="/hunt/hunt_tv.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
