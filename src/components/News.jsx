import React from 'react'
import { Box, Typography, Card, CardContent, Divider, CardActions, Button, Link, Stack } from '@mui/material'
import Moment from 'react-moment'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



const News = ({ news }) => {

    const shortText = ((text, length) => {
        if (text.length <= length) {
            return text
        }
        return text.substr(0, length) + '...'
    })
   
    return (
        <Box p={4}>
            <Typography sx={{ marginBottom: 1 }} variant='h5'> News </Typography>
            <Swiper
                spaceBetween={15}
                slidesPerView={10}
                slidesOffsetBefore={20}
                breakpoints={{
                    1920: {
                        slidesPerView: 4
                    },
                    1450: {
                        slidesPerView: 3
                    },
                    1020: {
                        slidesPerView: 2
                    },
                    600: {
                        slidesPerView: 1
                    },
                    480: {
                        slidesPerView: 2
                    },
                    0: {

                        slidesPerView: 1
                    }
                }}
            
            >
                {
                    news?.value.map((news, i) => {
                        const dateToFormat = news?.datePublished
                        return (
                          <SwiperSlide>
                                <Card key={news[i]} variant='outlined' sx={{ maxWidth: 300, minHeight: 300 }}>
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Typography variant='subtitle2'> {shortText(news?.name, 50)} </Typography>
                                            <Typography variant='caption'> {news?.provider?.[0]?.name} </Typography>
                                            <Typography variant='caption'> <Moment format="LLL" date={dateToFormat} />   </Typography>
                                            <Divider light />
                                            <Typography variant='body2'> {shortText(news?.description, 100)} </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={news?.url} target="_blank" underline="none" > <Button size='small'> Learn More </Button> </Link>
                                    </CardActions>
                                </Card>
                            </SwiperSlide> 
                        )
                    })  
                }
            </Swiper>
        </Box>
    )
}

export default News