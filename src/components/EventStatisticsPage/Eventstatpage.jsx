import React, { useEffect, useState, PureComponent } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, } from 'recharts';
import styles from '../../styles/eventstatpage.module.css';
import AdminHeader from '../AdminHeader';
import Footer from '../Footer';

import Badge from './Ratingbadge';
import Visitbadge from './Visitbadge';


const testRatingData = ([
    {
      rating: 1,
      amount: 8
    },
    {
      rating: 2,
      amount: 5
    },
    {
      rating: 3,
      amount: 15
    },
    {
      rating: 4,
      amount: 21
    },
    {
      rating: 5,
      amount: 32
    }
]);

const testVisitData = [
  {
    name: 'ИРИТ-РтФ',
    value: 37
  },
  {
    name: 'ИНМТ',
    value: 14
  },
  {
    name: 'СтФ',
    value: 3
  }
]

function Eventstatpage() {
  const [ratingChartData, setRatingChartData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [eventData, setEventData] = useState({});
  
  const id = searchParams.get('id');
  const getEventData = async () => {
    try {
      const response = await axios.get(`/api/event/${id}`);
      setEventData({
        ...response.data.event,
        avgRating: response.data.event.rating_points_sum / response.data.event.raters_amount
      });
    } catch (error) {
      setEventData({});
    }
  }

  const getRatings = async () => {
    try {
      const response = await axios.get(`/api/event/ratings?id=${id}`, { withCredentials: true });
      const { stat } = response.data;
      const statToChartData = [];
      for (let i = 1; i <= 5; i++) {
        statToChartData.push({
          rating: i,
          amount: stat[i]
        });
      }
      setRatingChartData(statToChartData);
    } catch (error) {
      setRatingChartData([]);
    }
  }

  useEffect(() => {
    getEventData();
    getRatings();
  }, [])

  return (
    <div className={styles.evtStatPage}>
      <AdminHeader />
      <h1 className={styles.mainTitle}>{eventData.title}</h1>
      <div className={`${styles.chartRow}`}>
        <div className={`${styles.chartBlock} ${styles.ratingBlock}`}>
          <h2>Рейтинг мероприятия</h2>
          <div className={styles.row}>
            <Badge>4.6</Badge>
            <span className={styles.avgRatingText}>Средний рейтинг</span>
          </div>
          <div className={styles.ratingChart}>
            <BarChart
              width={350}
              height={300}
              data={testRatingData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" /> {/* Показываем оценки на оси X */}
              <YAxis allowDecimals={false}/> {/* dataKey не нужен здесь - YAxis автоматически использует значения Bar */}
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="amount"  
                name="Количество оценок" 
                fill="#2B7A77" 
                activeBar={<Rectangle fill="pink" stroke="blue" />} 
              />
            </BarChart>
          </div>
        </div>
        
        {/* Заменю на круговую, пока для примера */}
        <div className={`${styles.chartBlock} ${styles.visitBlock}`}>
          <h2>Посещение</h2>
          <div className={styles.row}>
            <Visitbadge>
              54
            </Visitbadge>
            <span className={styles.avgRatingText}>Количество гостей</span>
          </div>
          <div className={styles.pieChart}>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={testVisitData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#2B7A77"
                  label
                />
                <Pie dataKey="value" data={testVisitData} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
              </PieChart>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Eventstatpage