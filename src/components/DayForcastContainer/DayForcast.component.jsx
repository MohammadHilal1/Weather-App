import React, {useState, useEffect} from 'react'
import { Typography, CircularProgress, Stack} from '@mui/material'
import axios from 'axios'
import moment from 'moment'

const DayForcast = ({search, searchFlag, setsearchFlag}) => {
    const [dayForcastList, setdayForcastList] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {    
        if(searchFlag){
            setloading(true)
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&cnt=8&appid=fd2113c94205e53994ad9ec7c561ea7c`)
        .then(function(response){
          console.log(response.data)
          setdayForcastList(response.data.list)
          setloading(false)
        }).catch(function(error){
          console.log(error)
          setloading(false)
        })
        }    
      }, [searchFlag])
  return (
        <>
        <Typography variant='h4' mb={2}>
            Today Forcast
        </Typography>
        {
            loading ? <CircularProgress/> :

            <Stack className='dayForcastContainer' spacing={4} direction="row">
            {
                dayForcastList.map( (forcast, index) => {
                return (
                    <Stack spacing={1} className='hourlyForcast' alignItems='center' justifyContent='center' key={index}>
                <img
                src={require(`../../images/${forcast.weather[0].main}.svg`).default}
                alt={forcast.weather[0].main}
                style={{height: '40px', width: '50px'}}>
                </img>
                <Typography style={{width: 'max-content', color: 'rgb(0 164 250)'}}>
                    {forcast.weather[0].description}
                </Typography>
                <Typography style={{width: 'max-content'}} variant='h6'>
                    {moment(forcast.dt_txt).format("hh:mm a")}
                </Typography>
            </Stack>
                )})
            }
        </Stack>
        }
        
        </>
        
    
  )
}

export default DayForcast