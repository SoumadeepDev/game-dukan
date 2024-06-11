const Socials = ({ socialIcons }) => {
  return (
    <li className="share">
      <a href={socialIcons.target}>
        <i className={`bi ${socialIcons.icon}`}></i>
      </a>
    </li>
  );
};
export default Socials;
