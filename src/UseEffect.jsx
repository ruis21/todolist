// import { useState } from 'react'
// import './App.css'
import { useState, useEffect } from 'react'


const Timer = () => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 돌아가는 중 ing...')
        }, 1000);

        return () => {
            clearInterval(timer);
            console.log('타이머 종료???')
        };
    });

    return (
        <>
            <p>타이머 시작!</p>
        </>
    )
}




function UseEffect() {

    // useEffect 
    // 1. 화면이 랜더링 될때마다
    // useEffect(() => {
    //   console.log('헬로')
    // });

    // 2. 첫 실행 후 리스트추가될 때만 실행
    // useEffect(() => {
    //   console.log('리스트 추가됨')
    // }, [todos]);


    // 3. 첫 랜더링되었을 때만 실행할때
    // useEffect(() => {
    //   console.log('리스트 추가됨')
    // }, []);

    const [showTimer, setShowTimer] = useState(false);

    return (


        <div>
            {/* showTimer가 ture일 때만 <Timer/>를 보여줌 */}
            {showTimer && <Timer />}
            <button onClick={() => setShowTimer(!showTimer)}>토글 버튼</button>
            {/* !는 반대로 실행 */}
        </div>

    )

}




export default UseEffect
