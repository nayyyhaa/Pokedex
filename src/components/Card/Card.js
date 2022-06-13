import "./card.css";

export const Card = ({ pokemon }) => {
  const { img, name, id } = pokemon;
  return (
    <div className="card grid-ctr flex-col">
      <img src={img} alt={name} style={{ width: "130px", height: "130px" }} />
      <p>Id: {id}</p>
      <p>Name: {name}</p>
    </div>
  );
};
