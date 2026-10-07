import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <p>{new Date().getFullYear()} © PlotTracker By Bondy - Tous droits réservés</p>
      <p>Designed & developed with <img alt="Heart icon" width={11} height={10} src="/icons/heart.svg" /> By PULSE</p>
    </footer>
  )
}