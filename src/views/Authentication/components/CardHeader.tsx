/* eslint-disable prettier/prettier */
interface CardHeaderProps {
  cardTitle: string | React.ReactNode
  cardDescription: string
}

const CardHeader: React.FC<CardHeaderProps> = ({
  cardTitle,
  cardDescription,
}) => {
  return (
    <div className="grid gap-2">
      <h1 className="font-[poppins-600] text-center sm:text-justify text-2xl sm:text-4xl text-[#272848]">
        {cardTitle}
      </h1>
      <p className="text-[#717E95] text-center sm:text-justify text-base ">{cardDescription}</p>
    </div>
  )
}

export default CardHeader
