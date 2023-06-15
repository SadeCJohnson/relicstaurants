import { ErrorMessage, Hero } from 'components/common';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  HomeWrapper,
  InputWrapper,
  StyledInput,
  StyledInputText,
} from './home.styled';

const Home = () => {
  const navigate = useNavigate();
  const [errorInValidation, setErrorInValidation] = useState();
  const pino = require('pino');
  const logger = pino({ level: 'info' });

  return (
    <HomeWrapper>
      <InputWrapper>
        <StyledInputText>
          <p>Let's get our grub on yuhhh</p>
        </StyledInputText>
        <StyledInput
          onChange={(e) => {
            if (e.target.value.length >= 5) setErrorInValidation(false);
            //console.logger('User location input: ', e);
            logger.info('User location input: ', e);
          }}
          onSearch={(value) => {
            if (value.length >= 5) {
              localStorage.setItem('address', value);
              navigate('/restaurants', { state: value });
            } else {
              setErrorInValidation(true);
            }
          }}
          size="large"
          placeholder="Enter your address"
          enterButton
        />
        {errorInValidation && (
          <ErrorMessage>
            Address should be at least 5 characters long
          </ErrorMessage>
        )}
      </InputWrapper>
      <Hero />
    </HomeWrapper>
  );
};

export default Home;
