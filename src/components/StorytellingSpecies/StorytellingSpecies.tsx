import './StorytellingSpecies.scss';

interface StorytellingSpeciesProps {
    storytelling: {
        description: string;
    } | null | undefined
}

function StorytellingSpecies({ storytelling }: StorytellingSpeciesProps) {

    if (storytelling === undefined || storytelling === null) return (
        <div className="storytellingSpecies">
            <h2 className="title-h2">Zoom sur vos espèces</h2>

            <div className="storytellingSpecies_text">
                <p className="paragraph">Pas de storytelling pour cette especes</p>
            </div>
        </div>
    );

    return (
        <div className="storytellingSpecies">
            <h2 className="title-h2">Zoom sur vos espèces</h2>

            <div className="storytellingSpecies_text">
                <p className="paragraph">{storytelling.description}</p>
            </div>
        </div>
    )
}

export default StorytellingSpecies;
