import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

import { FaTemperatureHigh } from 'react-icons/fa';
import { GiHeavyRain, GiDew, GiThermometerCold } from 'react-icons/gi';
import {
  WiHumidity,
  WiWindy,
  WiBarometer,
  WiHot,
  WiSnow,
  WiDaySunny,
  WiWindDeg,
  WiStrongWind
} from 'react-icons/wi';
import { Row, Col, Form, FormCheck } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  card: {
    minWidth: 5,
    margin: 'auto',
    marginTop: 10,
    border: '2px solid #FFB81C',
    padding: 0,
    fontSize: 8
  },
  cardFilter: {
    minWidth: 5,
    margin: 'auto',
    marginTop: 10,
    backgroundColor: 'transparent',
    padding: 0,
    fontSize: 8
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 8,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    height: '500px',
    width: '40%',
    marginLeft: '30%',
    marginTop: '100px',
    backgroundColor: '#E8ECEF',
    borderRadius: '5px',
    textShadow: '1px 1px black',
    boxShadow: '2px 2px 2px gray',
    color: 'white'
  },
  floatL:{
    marginRight:'75%'
  },
  form: {
    marginTop: '20px'
  },
  button2: {
    marginTop: '30%',
    backgroundColor: '#2c8c99'
  }
}));

const paperStyle = {
  backgroundColor: '#E8ECEF',
  marginTop: '20px',
  marginBottom: '20px'
};

const cardStyle = {
  padding: 5,
}

const valueFormat = {
  textAlign: 'center',
}


// localStorage.getItem('myLocalStorage') ||

export default function CurrData() {

  const classes = useStyles();
  const [chipData, setChipData] = useState([
    { key: 0, value:0, title:'AirTemp_C', label: 'Temperature:', check: true },
    { key: 1, value:0, title:'RH', label: 'Humidity:', check: true },
    { key: 2, value:0, title:'RainReset', label: 'Rainfall:', check: true },
    { key: 3, value:0, title:'3', label: 'Air Quality:', check: true },
    { key: 4, value:0, title:'Barometer_KPa', label: 'Barometric Pressure:', check: true },
    { key: 5, value:0, title:'DewPoint', label: 'Dew Point:', check: true },
    { key: 6, value:0, title:'6', label: 'Human Perception:', check: true },
    { key: 7, value:0, title:'7', label: 'UV Index:', check: true },
    { key: 8, value:0, title:'7', label: 'Snow Accumulation:', check: true },
    { key: 9, value:0, title:'8', label: 'Solar Radiation:', check: true },
    { key: 10, value:0, title:'WindSpeed_ms', label: 'Wind Speed:', check: true },
    { key: 11, value:0, title:'WindDirect_deg', label: 'Wind Direction:', check: true },
    { key: 12, value:0, title:'WindChill', label: 'Wind Chill:', check: true }
  ]);

  // save to localstorage
  useEffect(() => {
    localStorage.setItem('myLocalStorage', chipData);
  }, [chipData]);

  // get from localstorage
  // localStorage.myMap = JSON.stringify(Array.from(map.entries()));
  // const map = new Map(JSON.parse(localStorage.myMap));

  const loadData = async (chips) => {
    //UPDATES every 35 seconds, right now it is set to 5 for testing
    let serverData = await axios.get(`/api/main/load-all/mount_carmel`);
    serverData = serverData['data']
    // console.log("CHIPPYS: ", chips)
    return chips.map(element=>{
      element.value = serverData[element.title];
      return {...element, value: element.value === undefined ? 0 : element.value}
    });
  }
  // const [serverData, updateData] = useState(loadData(chipData));
  useEffect(() => {
    setTimeout(async () => {
      setChipData(await loadData(chipData));
    }, 5000);
  });
  

  const secondColStart = Math.floor(chipData.length / 2);

  const [open, setOpen] = useState(false);

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root} style={paperStyle}>
      <Row>
          {chipData.map(data => {
            let icon;
            if (data.label === 'Temperature:') {
              icon = <FaTemperatureHigh />;
            } else if (data.label === 'Humidity:') {
              icon = <WiHumidity />;
            } else if (data.label === 'Rainfall:') {
              icon = <GiHeavyRain />;
            } else if (data.label === 'Air Quality:') {
              icon = <WiWindy />;
            } else if (data.label === 'Barometric Pressure:') {
              icon = <WiBarometer />;
            } else if (data.label === 'Dew Point:') {
              icon = <GiDew />;
            } else if (data.label === 'Human Perception:') {

            } else if (data.label === 'UV Index:') {
              icon = <WiHot />;
            } else if (data.label === 'Snow Accumulation:') {
              icon = <WiSnow />;
            } else if (data.label === 'Solar Radiation:') {
              icon = <WiDaySunny />;
            } else if (data.label === 'Wind Speed:') {
              icon = <WiStrongWind />;
            } else if (data.label === 'Wind Direction:') {
              icon = <WiWindDeg />;
            } else if (data.label === 'Wind Chill:') {
              icon = <GiThermometerCold />;
            }

            if (data.check !== false) {
              return (
                //Now using card :)
                <Card className={classes.card} key={data.key}>
                   <CardHeader style={cardStyle}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {icon}
                      </Avatar>
                    }
                    title={data.label}
                    subheader="September 14, 2016"
                  />
                  <CardContent style={cardStyle}>
                    <Typography variant="h5" component="h5" style={valueFormat}>
                      {data.value}
                    </Typography>
                  </CardContent>
                  <CardActions style={cardStyle}>
                    <Button className="floatL" size="small">?</Button>
                  </CardActions>
                </Card>
                // <Chip
                //   key={data.key}
                //   icon={icon}
                //   label={data.label}
                //   // onDelete={handleDelete(data)}
                //   className={classes.chip}
                // />
              );
            }
          })}

        <Card className={classes.cardFilter}>
          <CardActions>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleOpen}
          >
            Filter
          </Button>
          </CardActions>
        </Card>
      </Row>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div>
          <Row>
            <h1>Weather Filter Control</h1>
          </Row>
          <Row>
            <Form>
              <Row>
                <Col>
                  {chipData.slice(0, secondColStart).map(data => (
                    <div
                      key={data.key}
                      className="mb-3"
                      className={classes.form}
                    >
                      <FormCheck
                        inline
                        label={data.label}
                        type={'checkbox'}
                        id={data.key}
                        defaultChecked={data.check}
                        onChange={e => {
                          if (chipData[data.key].check === false) {
                            chipData[data.key].check = true;
                          } else {
                            chipData[data.key].check = false;
                          }
                          console.log('CHIP:', chipData);
                        }}
                      />
                    </div>
                  ))}
                </Col>
                <Col>
                  {chipData.slice(secondColStart).map(data => (
                    <div
                      key={data.key}
                      className="mb-3"
                      className={classes.form}
                    >
                      <FormCheck
                        inline
                        label={data.label}
                        type={'checkbox'}
                        id={data.key}
                        defaultChecked={data.check}
                        onChange={e => {
                          if (chipData[data.key].check === false) {
                            chipData[data.key].check = true;
                          } else {
                            chipData[data.key].check = false;
                          }
                          // console.log('CHIP:', chipData);
                        }}
                      />
                    </div>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="contained"
                    className={classes.button2}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="contained"
                    className={classes.button2}
                    onClick={handleClose}
                  >
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </div>
      </Modal>
    </Paper>
  );
}
