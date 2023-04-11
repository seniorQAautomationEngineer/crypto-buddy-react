import React, { Component } from "react";
import { Form, Button, Table } from "react-bootstrap";
import cryptoData from "../app/json/cryptoData.json";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      countries: [],
      socialNetworks: [],
      types: [],
      selectedCoin: "",
      selectedCountry: "",
      selectedSocialNetwork: "",
      selectedCryptoType: "",
      searchResults: [],
    };
  }

  componentDidMount() {
    // Fetch data from JSON files and update state
    fetch(cryptoData)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          coins: data.coins,
          countries: data.countries,
          socialNetworks: data.socialNetworks,
          types: data.types,
        });
      })
      .catch((error) => console.error(error));
  }

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
      socialNetworks,
      types,
      selectedCoin,
      selectedCountry,
      selectedSocialNetwork,
      selectedCryptoType,
      searchResults,
    } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Form.Group controlId="coinList">
            <Form.Label>Coin</Form.Label>
            <Form.Control
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
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="countryList">
            <Form.Label>Country</Form.Label>
            <Form.Control
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
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="socialNetworks">
            <Form.Label>Social Network</Form.Label>
            <Form.Control
              as="select"
              value={selectedSocialNetwork}
              onChange={(event) =>
                this.setState({ selectedSocialNetwork: event.target.value })
              }
            >
              <option value="">Select a social network</option>
              {socialNetworks.map((socialNetwork) => (
                <option key={socialNetwork.name} value={socialNetwork.name}>
                  {socialNetwork.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="cryptoTypeList">
            <Form.Label>Crypto Type</Form.Label>
            <Form.Control
              as="select"
              value={selectedCryptoType}
              onChange={(event) =>
                this.setState({ selectedCryptoType: event.target.value })
              }
            >
              <option value="">Select a crypto type</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mr-2">
            Search
          </Button>
          <Button variant="secondary" onClick={this.handleClear}>
            Clear
          </Button>
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
