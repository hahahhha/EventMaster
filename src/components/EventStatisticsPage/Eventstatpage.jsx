import React, { useEffect, useState, PureComponent } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import styles from '../../styles/eventstatpage.module.css';
import AdminHeader from '../AdminHeader';
import Footer from '../Footer';

import Badge from './Ratingbadge';
import Visitbadge from './Visitbadge';
import Usertable from './Usertable';
import Modal from '../Modal/Modal';
import checkIsAdmin from '../../functions/checkIsAdmin';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#A4DE6C'];

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
  const [screenWidth, setScreenWidth] = useState();
  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [eventData, setEventData] = useState({});
  
  const id = searchParams.get('id');
  const getEventData = async () => {
    try {
      const response = await axios.get(`/api/event/${id}`);
      const rating = parseInt(response.data.event.rating_points_sum) / parseInt(response.data.event.raters_amount) || `0`;
      setEventData({
        ...response.data.event,
        avgRating: rating
      });
      console.log(response.data.event);
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
    setScreenWidth(window.innerWidth);
    console.log(window.innerWidth);
    getEventData();
    getRatings();
    checkIsAdmin();
  }, [])

  return (
    <div className={styles.evtStatPage}>
      <AdminHeader />
      <div className={styles.mainContainer}>
        <div className={`${styles.infoBlock} ${styles.titleBlock}`}>
          <h1 className={styles.mainTitle}>Статистика мероприятия "<i>{eventData.title}</i>"</h1>
        </div>
        <div className={`${styles.chartRow}`}>
          <div className={`${styles.infoBlock} ${styles.ratingBlock}`}>
            <h2>Рейтинг мероприятия</h2>
            <div className={styles.row}>
              <Badge>{eventData.avgRating}</Badge>
              <span className={styles.avgRatingText}>Средний рейтинг</span>
            </div>
            <div className={styles.ratingChart}>
              <BarChart
                width={screenWidth >= 800 ? 350 : 300}
                height={300}
                data={ratingChartData}
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
          
          <div className={`${styles.infoBlock} ${styles.visitBlock}`}>
            <h2>Посещение</h2>
            <div className={styles.row}>
              <Visitbadge>
                54
              </Visitbadge>
              <span className={styles.avgRatingText}>Количество гостей</span>
            </div>
            <div className={styles.pieChart}>
                <PieChart width={screenWidth >= 800 ? 400 : 360} height={400}>
                  {/* Первый Pie (основной) */}
                  <Pie
                    dataKey="value"
                    data={testVisitData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {testVisitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  {/* Второй Pie (внутренний или дополнительный) */}
                  <Pie
                    dataKey="value"
                    data={testVisitData}
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                  >
                    {testVisitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
            </div>
          </div>
        </div>
        <Usertable />
      </div>
      <Footer />
    </div>
  )
}

export default Eventstatpage