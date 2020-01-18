import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

export default () => (
    <Carousel controls>
        <Carousel.Item>
            <img
                src={`${process.env.PUBLIC_URL}/img/rack_30.png`}
                alt="Yet another rack_30.png" 
            />
            
            <Carousel.Caption>
                <h3>Cool rack name</h3>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                src={`${process.env.PUBLIC_URL}/img/rack_42.png`} 
                alt="Yet another rack_42.png"
            />
            
            <Carousel.Caption>
                <h3>Damn thats big rack</h3>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
);