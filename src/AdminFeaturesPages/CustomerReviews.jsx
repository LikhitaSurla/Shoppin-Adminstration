import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import reviewData from '../FetchingData/Review';
import { Title } from '@tremor/react';
import '../Styling/index.css';
import {Card,Flex,Text,TabGroup,TabList,Tab,TabPanels,TabPanel,} from "@tremor/react";


export default function CustomerReviews() {
  const [reviewCollection, setReviewCollection] = useState([]);

  const reviewDataset = async () => {
    try {
      const reviews = await reviewData();
      setReviewCollection(reviews);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reviewDataset();
  }, []);

  const aggregateData = (questionNumber) => {
    const counts = {};

    for (let i = 1; i <= 5; i++) {
      counts[`${questionNumber}-${i}`] = 0;
    }

    reviewCollection.forEach((review) => {
      const option = review[`q${questionNumber}`];
      counts[`${questionNumber}-${option}`] += 1;
    });

    const aggregatedData = Object.keys(counts).map((key) => ({
      questionOption: key,
      count: counts[key],
    }));

    return aggregatedData;
  };

  const renderBarCharts = () => {
    const questionNumbers = [1, 2, 3];
    return (
      <div className='reviewbarchart-column'>
        {questionNumbers.map((questionNumber) => (
          <div key={questionNumber} className='reviewbarchart'>
            <Title>{`${questionNumber}. How was your shopping experience with us today?`}</Title>
            <br/>
            <br/>
            <ResponsiveContainer padding={50} width={700} height={400}>
              <BarChart data={aggregateData(questionNumber)}>
                <XAxis dataKey="questionOption" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" width={100} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    );
  };

  const renderLineCharts = () => {
    const questionNumbers = [1, 2, 3];
    return (
      <div className='reviewlinegraph-column' justifyContent='center'>
        {questionNumbers.map((questionNumber) => (
          <div key={questionNumber} className='reviewlinegraph'>
            <Title>{`${questionNumber}. How was your shopping experience with us today?`}</Title>
            <br/>
            <br/>
            <ResponsiveContainer padding={50} width={700} height={400}>
              <LineChart
                data={aggregateData(questionNumber)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="questionOption" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
 

      <Card justifyContent='center' height={400} width={900}>
      <Title>  Customer Reviews </Title>
      
      <TabGroup  justifyContent='center'>
        <TabList className="mt-8">
          <Tab ><Title>BarChart</Title></Tab>
          <Tab ><Title>LineChart</Title></Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-10">
              <Flex className="mt-4">
                <Flex className="space-x-2" justifyContent="center">
                {renderBarCharts()}

                </Flex>
              </Flex>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-10">
              <Flex className="mt-4">
                <Flex className="space-x-2" justifyContent="center">
                {renderLineCharts()}

                </Flex>
              </Flex>
            </div>
          </TabPanel>
          
        </TabPanels>
      </TabGroup>
    </Card>

    </>
  );
}
