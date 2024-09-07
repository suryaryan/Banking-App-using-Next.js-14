"use client";
import {Chart as ChartJS,ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance)

  const data ={
    datasets:[
        {
           label:'Banks',
           data: balances,
           backgroundColor :['#074d3b','#027a1f','#2f9b5e']
        }
    ],
    labels:accountNames
  }
    return <Doughnut data={data} 
      options={{
        cutout: '60%',
        plugins:{
         legend:{
            display:false
      }
    }
    }
  }
      />
}

export default DoughnutChart;