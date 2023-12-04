import './App.css';
import DonationForm from "./forms/DonateForm";

function App() {
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
			<div className="col-md-10 mx-auto col-lg-6">
				<DonationForm />
			</div>
			<div className="col-lg-6 text-center text-lg-start">
	        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">All it takes is one spark to set the world Ablaze</h1>
	        <p className="col-lg-10 fs-4">All donations from individuals like you support Bishop Barron's Word on Fire Catholic Ministries, a 501(c)(3) non-profit organization proclaiming Christ in the culture. Together, through media both old and new, we share the transformative power of God's word where it is most needed.</p>
      </div>
			</div>
    </div>
  );
}

export default App;
