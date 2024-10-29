import React, { useEffect, useState } from 'react';
import { Editor, Frame } from '@craftjs/core';
import { Card, CardBottom, CardTop } from '../components/user/Card';
import { Button } from '../components/user/Button';
import { Text } from '../components/user/Text';
import { Container } from '../components/user/Container';
import { Image } from '../components/user/Image';
import SimpleSlider from '../components/user/Carousel';

const RenderPage = () => {
  const [layoutData, setLayoutData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('pageData');
    if (savedData) {
      setLayoutData(savedData);
    }
  }, []);

  return (
    <div>
      {layoutData ? (
        <Editor enabled={false} resolver={{ Card, Button, Text, Container, CardTop, CardBottom, Image,SimpleSlider}}>
          <Frame data={layoutData} />
        </Editor>
      ) : (
        <div>No saved data found!</div>
      )}
    </div>
  );
};

export default RenderPage;