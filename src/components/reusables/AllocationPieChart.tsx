import { useEffect, useContext, useRef } from 'react'
import { PieController, ArcElement, Chart } from 'chart.js'
import { userContext } from '../../contexts/UserContext'
import { reportContext } from '../../contexts/ReportContext'
import RequireAuth from '../wrappers/RequireAuth'
import Card from '../composites/Card'

export default function AllocationPieChart() {

    const { user } = useContext(userContext)
    const { report } = useContext(reportContext)

    const chartRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        Chart.register(
            PieController,
            ArcElement
        )

        const chart = new Chart(chartRef.current!, {
            type: 'pie',
            data: {
                labels: ["Savings", "Pocket Money", "Emergency Fund"],
                datasets: [{
                    label: '',
                    data: [
                        23,
                        40,
                        37
                    ],
                    backgroundColor: [
                        '#2EC4B6',
                        '#AB3131',
                        '#FF9F1C'
                    ],
                    clip: -10
                }]
            }
        })

        return () => chart.destroy()
    }, [report])

    return (
        <RequireAuth>
            <Card>
                <div className='p-8 w-[35vw] h-[52vh] flex flex-col justify-center'>
                    <h2 className='text-[16px]'>Current net worth allocation</h2>
                    <p className='text-[14px] font-bold italic'>Total net worth: PHP {
                        (report?.allocation.savings ?? 0) + 
                        (report?.allocation.pocketMoney ?? 0) + 
                        (report?.allocation.emergencyFund ?? 0)
                    }</p>
                    <div className='w-fit flex gap-3 m-auto'>
                        <span className='flex justify-start align-middle gap-1'>
                            <div className='w-3 h-3 my-auto bg-[#2EC4B6] rounded-sm' />
                            <p className='text-[14px] text-start'>Savings</p>
                        </span>
                        <span className='flex justify-start align-middle gap-1'>
                            <div className='w-3 h-3 my-auto bg-[#AB3131] rounded-sm' />
                            <p className='text-[14px]'>Pocket Money</p>
                        </span>
                        <span className='flex justify-start align-middle gap-1'>
                            <div className='w-3 h-3 my-auto bg-[#FF9F1C] rounded-sm' />
                            <p className='text-[14px]'>Emergency Fund</p>
                        </span>
                    </div>
                    
                    <canvas ref={chartRef} className='self-center'/>
                </div>
            </Card>
        </RequireAuth>
    )
}