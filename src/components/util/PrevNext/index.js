export default function PrevNext({ handlePrev, handleNext }) {
  return (<div className="row">
    <div className="col">
      <button type="button" className="btn btn-light float-left" onClick={() => handlePrev()}>
        <i className="bi-arrow-left-short"></i> Prev
      </button>
    </div>
    <div className="col">
      <button type="button" className="btn btn-light float-right" onClick={() => handleNext()}>
        Next <i className="bi-arrow-right-short"></i>
      </button>
    </div>
  </div>);
}
