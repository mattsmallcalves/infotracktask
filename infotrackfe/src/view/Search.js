import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "../component/Navbar/SimpleNavBar.js";

function SearchForm() {
  const [keyword, setKeyword] = useState('land registry searches');
  const [url, setUrl] = useState('infotrack.co.uk');
  const [searchEngine, setSearchEngine] = useState('Google');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsMessage, setResultsMessage] = useState([]);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      keyword,
      url,
      searchEngine
    };

    try {

      const response = await fetch('http://localhost:5205/scrap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
     
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if(data.jsonReturnModel.Result==='Success'){
        if(data.jsonReturnModel.Content==='Cannot get data due to cookies restriction from Google'){
          setResultsMessage(data.jsonReturnModel.Content);
        }
        else{
          setResultsMessage('No results to display');
        }
      setResults(data.positions);
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <div className="App">
    <Navbar/>
    <div className="App-header">
    <Container>
      <Row>
        <Col md={6} className="text-left">
          <h2>Search SEO Index</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <div style={{ textAlign: 'left' }}>
                <Label for="keyword">Keyword</Label>
              </div>
              <div>
                <Input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={{ textAlign: 'left' }}>
                <Label for="url">URL</Label>
              </div>
              <div>
                <Input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={{ textAlign: 'left' }}>
                <Label for="searchEngine">Search Engine</Label>
              </div>
              <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret className="w-100 text-left">
                    {searchEngine}
                  </DropdownToggle>
                  <DropdownMenu className="w-100">
                    <DropdownItem onClick={() => setSearchEngine('Google')}>
                      Google
                    </DropdownItem>
                    <DropdownItem onClick={() => setSearchEngine('Bing')}>
                      Bing
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </FormGroup>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Col>

        <Col md={6} className="text-left">
          <Card style={{ width: '18rem' }}>
            <CardHeader>
              Results
            </CardHeader>
            <ListGroup>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <ListGroupItem key={index} style={{ textAlign: 'left' }}>
                    Position: {result}
                  </ListGroupItem>
                ))
              ) : (
                <ListGroupItem>{resultsMessage}</ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  );
}

export default SearchForm;
