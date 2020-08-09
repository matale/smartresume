import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../layouts/Breadcrumbs';
import { Form, Container, Pagination, Jumbotron, Card, Button, Col } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import * as basicInfoServices from './../../../services/basicInfoServices';
import LocalStorageService from './../../../utils/localStorage';
import { useHistory } from 'react-router-dom';


function BasicInformation() {
  
  const history = useHistory();
  const [messageVariant, setMessageVariant] = useState('danger');
  const [hasMessage, setHasMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');


  const [formData, setFormData] = useState({
    _id: '',
    user_id: '5f278d28cf154530147bcf95',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    region: '',
    gitHub: '',
    linkedin: '',
  });

  const [userState, setUserState] = useState({
    isNew: true,
  });

  const {
    _id,
    user_id,
    firstName,
    lastName,
    email,
    phone,
    address,
    country,
    region,
    gitHub,
    linkedin, } = formData;

  /* // let token = localStorage.getItem('token');
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibWljaGVsbGFuZXRAZ21haWwuY29tIiwiX2lkIjoiNWYyYjE4ZjhkMGE2MDYwMDE3MWFkODlkIn0sImlhdCI6MTU5Njc0MjAyN30.EozwN6Im9WJXYWe2p63JLFt7wymSQaWCG6_7yebcaTk',
    },
  }; */

  const userInfo = LocalStorageService.getUserInfo();
    const payload = { 
        user_id: userInfo.userId,
        id: _id,
    firstName,
    lastName,
    email,
    phone,
    address,
    country,
    region,
    gitHub,
    linkedin,
    };

  useEffect(() => {
    /* axios.get('http://smartresumebuild.herokuapp.com/api/basicinfo/list/5f278d28cf154530147bcf95'
      , config)
      .then(function (response) {
        console.log('response', response.data.data[0]);

        if (Array.isArray(response.data.data) && response.data.data.length) {
          setFormData(response.data.data[0]);
          setUserState({ isNew: false });
          console.log('formdata', formData);
        }

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }); */
      const payload = { 
        userId: userInfo.userId
    };

      basicInfoServices.getAllBasicInfos(payload).then(res => {
        if (res.status === 200) {
          console.log('response', res.data.data[0]);

          if (Array.isArray(res.data.data) && res.data.data.length) {
            setFormData(res.data.data[0]);
            setUserState({ isNew: false });
            console.log('formdata', formData);
          }
  
        }
      });
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      id: _id,
      user_id,
      firstName,
      lastName,
      email,
      phone,
      address,
      country,
      region,
      gitHub,
      linkedin,
    };
    try {
      if (userState.isNew) {
        /* const response = await axios.post(
          'http://smartresumebuild.herokuapp.com/api/basicinfo/add',
          data,
          config
        ); */

        basicInfoServices.addBasicInfo(payload)
      .then(response => {
        console.log(response.data);
        history.push('/basic-information')
      })
      .catch((error) => {
        console.log(error.response.data.errors);
          setMessageVariant('danger');
          setHasMessage(true);
          setMessageInfo(error.response.data.errors[0].msg);
      });

        alert('Basic Information Created');
      }
      else {
        /* const response = await axios.put(
          'http://smartresumebuild.herokuapp.com/api/basicinfo',
          data,
          config
        ); */

        basicInfoServices.updateBasicInfo(payload)
      .then(response => {
        console.log(response.data);
        history.push('/basic-information')
      })
      .catch((error) => {
        console.log(error.response.data.errors);
          setMessageVariant('danger');
          setHasMessage(true);
          setMessageInfo(error.response.data.errors[0].msg);
      });

        
        alert('Basic Information Updated');
      }

      console.log('Basic Info Updated');
    } catch (e) {
      console.log(e.response.data.errors);
    }
  };


  function selectCountry(val) {
    setFormData({ ...formData, country: val });
  }

  function selectRegion(val) {
    setFormData({ ...formData, region: val });
  }

  const breadcrumbLinks = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Basic Information',
      path: '/basic-information',
      active: true
    }
  ];

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Container>
      <div>
        <Breadcrumbs links={breadcrumbLinks} />
        <Card
          bg='light'
          text='dark'
        ></Card>
        <Jumbotron>
          <h5>Basic Information</h5>
          <Form className="mt-4 mb-4" onSubmit={(e) => onSubmit(e)}>
            <Form.Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  value={firstName}
                  onChange={(e) => onChange(e)}
                  type="text" placeholder="Enter First Name" required />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  value={lastName}
                  onChange={(e) => onChange(e)}
                  type="text" placeholder="Enter Last Name" required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  type="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group as={Col} controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={phone}
                  onChange={(e) => onChange(e)}
                  type="tel" placeholder="Phone Number" required />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={address}
                onChange={(e) => onChange(e)}
                placeholder="1234 Main St E" required />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="country">
                <Form.Label>Country</Form.Label>
                <CountryDropdown
                  name="country"
                  className='form-control'
                  value={country}
                  onChange={(val) => selectCountry(val)}
                  required />
              </Form.Group>

              <Form.Group as={Col} controlId="region">
                <Form.Label>Region</Form.Label>
                <RegionDropdown
                  name="region"
                  className='form-control'
                  country={country}
                  value={region}
                  onChange={(val) => selectRegion(val)}
                  required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="gitHub">
                <Form.Label>GitHub Link</Form.Label>
                <Form.Control
                  name="gitHub"
                  value={gitHub}
                  onChange={(e) => onChange(e)}
                  type="text" placeholder="Type github link.." />
              </Form.Group>

              <Form.Group as={Col} controlId="linkedin">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                  type="text" placeholder="Type linkedin link" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Save
  </Button>
          </Form>
        </Jumbotron>
      </div>
    </Container>
  );
}

export default BasicInformation;
