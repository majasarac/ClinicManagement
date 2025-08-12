import React from 'react';
import {Container, Row, Col, Button, Jumbotron} from 'react-bootstrap';


function HomePage(){
    return (
    <Container className="text-center" style={{ marginTop: '50px' }}>
        <h1 className="display-3 mb-4">Welcome to Clinic management system</h1>
        <p>Use the menu above to navigate</p>
        <Button size="lg" variant="primary" href="/patients">Get Started</Button>
        <div style={{
        marginTop: '50px',
        maxWidth: '100%',
        height: '300px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px'
      }}></div>

    </Container>
        );
}
export default HomePage;
