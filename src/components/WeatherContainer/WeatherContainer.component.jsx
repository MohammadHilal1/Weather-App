import React, {useState, useEffect} from 'react'
import {Box, Container, FormControl, InputAdornment, TextField, Typography, Grid, CircularProgress, Stack} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import DayForcast from '../DayForcastContainer/DayForcast.component';
import sunrise from '../../images/sunrise.png'
import sunset from '../../images/sunset.png'
import moment from 'moment'

const WeatherContainer = () => {
    const [search, setsearch] = useState('Haldwani')
    const [locationData, setlocationData] = useState(undefined)
    const [searchFlag, setsearchFlag] = useState(true)
    const [loading, setloading] = useState(false)
    const handleSearchChange = (event) => {
        setsearch(event.target.value)
    }
    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            setloading(true)
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=fd2113c94205e53994ad9ec7c561ea7c`)
            .then(function(response){
                console.log(response.data)
                setlocationData(response.data)
                setsearchFlag(true)
                setloading(false)
            }).catch(function(error){
                console.log(error)
                setloading(false)
            })
        }
    }
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=fd2113c94205e53994ad9ec7c561ea7c`)
        .then(function(response){
            console.log(response.data)
            setlocationData(response.data)
        }).catch(function(error){
            console.log(error)
        })      
    }, [])
    
    
  return (
    <Container maxWidth="sm" className='Container'>
      <Box mb={2}>
        <FormControl style={{width: '60%'}}>
            <TextField
            label='Search Location'
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                    <SearchIcon/>
                    </InputAdornment>
                ),

                endAdornment: (
                    <InputAdornment position='end'>
                        {
                            loading && <CircularProgress style={{width: '30px', height: '30px'}}/>
                        }
                        
                    </InputAdornment>
                )
            }}
            color='primary'
            placeholder='Enter Location'
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            />
        </FormControl>
      </Box>
      {loading ? <CircularProgress/> : 
      locationData && 
      <>
      <Box mb={2}>
      <Grid container spacing={2}>
            <Grid container item xs={6} justifyContent='flex-start' flexDirection='column' alignItems='flex-start'>
                <Typography variant='h5'>
                    {locationData.name}, {locationData.sys.country}
                </Typography>
                <Typography variant='h3'>
                 {locationData.main.temp}&deg;C
                </Typography>
                <Typography variant='h6'>
                        Day {locationData.main.temp_min}&deg;C
                    </Typography>
                    <Typography variant='h6'>
                        Night {locationData.main.temp_max}&deg;C
                    </Typography>
                <Typography variant='h6'>
                    WindSpeed: {locationData.wind.speed}
                </Typography>
            </Grid>
            <Grid container item xs={6} justifyContent='flex-end' flexDirection='column' alignItems='flex-end'>
                <Stack justifyContent='flex-start' flexDirection='column' alignItems='flex-start'>
                <Typography variant='h6'>
                    {new moment().format('dddd')}
                </Typography>
                <img
                src={require(`../../images/${locationData.weather[0].main}.svg`).default}
                alt='Haze'
                style={{height: '60px', width: '60px'}}>
                </img>
                <Typography variant='h6'>
                    {locationData.weather[0].description}
                </Typography>
                <Typography variant='h6'>
                    Humidity: {locationData.main.humidity}%
                </Typography>
                <Typography variant='h6'>
                    Pressure: {locationData.main.pressure}mBar
                </Typography>
                </Stack>
                
            </Grid>
      </Grid>
      </Box>
        <Grid container spacing={2} style={{paddingTop: '20px'}} mb={2}>
        <Grid item xs={6}>
        <Typography variant='h5'>
                Sunrise
            </Typography>
            <img
            src={sunrise}
            alt='sunrise'
            style={{height: '60px', width: '60px'}}/>
            
            <Typography variant='h6'>
            {moment.unix(locationData.sys.sunrise).format("hh:mm a")}
            </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant='h5'>
                Sunset
            </Typography>
            <img
            src={sunset}
            alt='sunset'
            style={{height: '60px', width: '60px'}}/>
            
            <Typography variant='h6'>
                {moment.unix(locationData.sys.sunset).format("hh:mm a")}
            </Typography>
        </Grid>
    </Grid>
      
      <DayForcast search={search} searchFlag={searchFlag} setsearchFlag={setsearchFlag}/>  
      </>  
}  
    </Container>
  )
}

export default WeatherContainer

