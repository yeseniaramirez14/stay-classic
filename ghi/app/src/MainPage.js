import car from "./imgs/car1.jpg"

function MainPage() {
  return (
    <div className="px-4 py-5 my-2 text-center">
      <h1 className="display-5 fw-bold">Stay Classic Dealership</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management for <b>classic cars</b> including inventory, sales and services! 
        </p>
        {content.map(createEntry)}
      </div>
      <div>
        <img className="mainPic" src={car} alt="Chevy Car" />
      </div>
    </div>
  );
}

export default MainPage;
