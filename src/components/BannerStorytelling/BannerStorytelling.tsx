
import './BannerStorytelling.scss'


type BannerStorytellingProps = {
    bannerImage: string,
    label: string
}

function BannerStorytelling({ bannerImage, label }: BannerStorytellingProps) {
    return (
        <div className="bannerStorytelling">
            <picture className="bannerStorytelling-picture">
                <img src={bannerImage} alt={label} />
            </picture>
        </div>
    )
}

export default BannerStorytelling;