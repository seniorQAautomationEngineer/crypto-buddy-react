import { Container } from "reactstrap";
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Container>
          <div className="elfsight-app-59da9f27-89a1-4611-b879-c78b5ffe3eae"></div>
          <Helmet>
            <script src="https://apps.elfsight.com/p/platform.js" defer></script>
          </Helmet>
      </Container>
   </div>
  );
}

export default HomePage;


// <!-- jQuery must come first, then Popper.js, then the Bootstrap JavaScript plugins.-->
// <script src="node_modules/jquery/dist/jquery.slim.min.js"></script>
// <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
// <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
// <script src="https://apps.elfsight.com/p/platform.js" defer></script>