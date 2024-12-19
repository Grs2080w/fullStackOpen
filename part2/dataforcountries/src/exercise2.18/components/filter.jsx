import Countries from "../server/countries";

export default function Filter({ filter, inputFilter }) {
  return (
    <div>
      find countries <input value={filter} onChange={inputFilter} type="text" />
    </div>
  );
}
