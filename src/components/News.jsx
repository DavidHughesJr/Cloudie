import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Divider, CardActions, Button, Link, Stack } from '@mui/material'
import Moment from 'react-moment'
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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 1, md: 8, lg: 12}}
            >  
                {
                    news?.value.map((news, i) => {
                        const dateToFormat = news?.datePublished
                        return (
                            <Grid item xs={2} sm={4} md={4} key={i}>
                                <Card variant='outlined' sx={{ maxWidth: 300, minHeight: 300 }}>
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Typography variant='subtitle2'> {shortText(news?.name, 50)} </Typography>
                                            <Typography variant='caption'> {news?.provider?.[0]?.name} </Typography>
                                            <Typography variant='caption'> <Moment format="LLL" date={dateToFormat} />   </Typography>

                                            <Divider light />
                                            <Typography variant='body2'> {shortText(news?.description, 125)} </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={news?.url} target="_blank" underline="none" > <Button size='small'> Learn More </Button> </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })  
                }
            </Grid>
        </Box>
    )
}

export default News