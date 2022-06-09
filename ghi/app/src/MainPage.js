import Card from "./Card";
import content from "./content";

function createEntry(entry) {
  return <Card key={entry.id} emoji={entry.emoji} back={entry.back} />;
}


function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
        {content.map(createEntry)}
      </div>
    </div>
  );
}

export default MainPage;
