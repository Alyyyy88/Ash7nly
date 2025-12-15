import { useParams } from 'react-router'

const TrackOrder = () => {
  const { trackingNumber } = useParams();

  console.log("Tracking Number:", trackingNumber);
  return (
    <div>TrackOrder</div>
  )
}

export default TrackOrder