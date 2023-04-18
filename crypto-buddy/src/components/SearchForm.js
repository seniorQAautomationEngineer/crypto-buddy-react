import React, { Component } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import cryptoData from "../app/json/cryptoData.json";
import searchResultsData from "../app/json/searchResults.json";
//import { cryptoData } from "../app/data/dropDownValues";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: cryptoData.coins,
      countries: cryptoData.countries,
      // socialNetworks: [],
      // types: [],
      selectedCoin: "",
      selectedCountry: "",
      selectedSocialNetwork: "",
      selectedCryptoType: "",
      searchResults: searchResultsData,
    };
  }

  // componentDidMount() {
  //   // Fetch data from JSON file and update state
  //   console.log(cryptoData);
  //   fetch(cryptoData)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({
  //         coins: data.coins,
  //         countries: data.countries,
  //         socialNetworks: data.socialNetworks,
  //         types: data.types,
  //       });
  //     })
  //     .catch((error) => console.error(error));
  // }

  handleSubmit = (event) => {
    event.preventDefault();

    // Get selected values from state
    const {
      selectedCoin,
      selectedCountry,
      selectedSocialNetwork,
      selectedCryptoType,
    } = this.state;

    // Fetch data from JSON file
    fetch("./app/json/searchResults.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter data based on selected values
        const filteredData = data.coins.filter((item) => {
          return (
            item.name === selectedCoin &&
            item.groups.some(
              (group) =>
                group.source === selectedSocialNetwork &&
                group.type === selectedCryptoType
            )
          );
        });

        // Update state with filtered data
        this.setState({ searchResults: filteredData });
      })
      .catch((error) => console.error(error));
  };

  handleClear = () => {
    // Clear selected values and search results in state
    this.setState({
      selectedCoin: "",
      selectedCountry: "",
      selectedSocialNetwork: "",
      selectedCryptoType: "",
      searchResults: [],
    });
  };

  render() {
    const {
       coins,
       countries,
      // socialNetworks,
      // types,
      selectedCoin,
      selectedCountry,
      selectedSocialNetwork,
      selectedCryptoType,
      searchResults,
    } = this.state;

    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          className="mb-4 mb-4 form-horizontal"
        >
          <Row>
            <Col md={2}>
              <Form.Label>Coin</Form.Label>
              <Form.Select
                as="select"
                value={selectedCoin}
                onChange={(event) =>
                  this.setState({ selectedCoin: event.target.value })
                }
              >
                <option value="">Select a coin</option>
                {coins.map((coin) => (
                  <option key={coin.name} value={coin.name}>
                    {coin.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>Country</Form.Label>
              <Form.Select
                as="select"
                value={selectedCountry}
                onChange={(event) =>
                  this.setState({ selectedCountry: event.target.value })
                }
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label className="social-label">Social Network</Form.Label>
              <Form.Select
                as="select"
                value={selectedSocialNetwork}
                onChange={(event) =>
                  this.setState({ selectedSocialNetwork: event.target.value })
                }
              >
                <option value="">Select group</option>
                <option value="">Website</option>
                <option value="">Telegran</option>
                <option value="">Facebook</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>Crypto Type</Form.Label>
              <Form.Select
                as="select"
                value={selectedCryptoType}
                onChange={(event) =>
                  this.setState({ selectedCryptoType: event.target.value })
                }
              >
                <option value="">Select type</option>
                <option value="">Official</option>
                <option value="">Popular</option>
               
              </Form.Select>
            </Col>
            <Col md={1}>
              <Button type="submit" variant="primary" className="mr-2">
                Search
              </Button>
            </Col>
            <Col md={1}>
              <Button variant="secondary" onClick={this.handleClear}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>

        {searchResults.length > 0 && (
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Source</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.name}</td>
                  <td>{result.symbol}</td>
                  <td>{result.groups[0].source}</td>
                  <td>{result.groups[0].type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {searchResults.length === 0 && (
          <div className="mt-4">
            {selectedCoin ||
            selectedCountry ||
            selectedSocialNetwork ||
            selectedCryptoType ? (
              <p>No search results found.</p>
            ) : (
              <p>
                Please select options from the drop-down lists and click
                "Search" to see results.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchForm;
