import Image from "next/image"
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ customerName, customerPosition, customerCompany, customerReview, rating, avatarUrl }) => {
  return (
    <div className="p-6">
      <div className="flex items-start space-x-4 mb-4">
        <Image
          src={avatarUrl || "/placeholder.svg?height=48&width=48"}
          alt={`${customerName}'s Avatar`}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <h4 className="text-lg font-semibold text-white">{customerName}</h4>
          <p className="text-sm text-gray-400">
            {customerPosition}, {customerCompany}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <FaStar  key={index} className={`h-4 w-4 ${index < rating ? "text-yellow-400 " : "text-gray-500"}`} />
              
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-300">{customerReview}</p>
    </div>
  )
}

export default TestimonialCard
