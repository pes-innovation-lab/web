export default function RoadShowVideo({ onEnded }) {
    return (
        <div className="flex justify-center items-center w-full">
            <video className="w-[95%]" autoPlay muted onEnded={onEnded}>
                <source src="/roadshow/2024Reel.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
