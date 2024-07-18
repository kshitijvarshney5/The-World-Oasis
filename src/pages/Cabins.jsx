//
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
// import Button from "../ui/Button";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  // const [showFrom, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />

        {/* <Button onClick={() => setShowForm(!showFrom)}>Add new Cabin</Button>
        {showFrom && <CreateCabinForm />} */}
      </Row>
    </>
  );
}

export default Cabins;
