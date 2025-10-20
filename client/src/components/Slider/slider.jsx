import React from 'react';
import { useSliderLogic } from './sliderLogic';
import { Container, Newsletter, FormInput, SubmitBtn, Heading, Form } from './sliderStyles';

export default function Slider() {
  const { email, setEmail, handleSubmit } = useSliderLogic();

  return (
    <Container>
      <Newsletter>
        <Heading>Subscribe to our newsletter</Heading>
        <Form onSubmit={handleSubmit}>
          <FormInput 
            type='text' 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitBtn value="Subscribe" /> 
        </Form>
      </Newsletter>
    </Container>
  );
}