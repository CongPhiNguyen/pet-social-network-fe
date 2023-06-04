import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card, Col, Row } from "antd"
import { fetchImagesByBreed } from "../DogApi"

const Breed = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { breedId } = useParams()

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImagesByBreed(breedId)
      setImages(data)
      setLoading(false)
    }
    getImages()
  }, [breedId])

  return (
    <Row gutter={16}>
      {images.map((image) => (
        <Col span={8} key={image.id}>
          <Card
            loading={loading}
            hoverable
            cover={<img alt={image.breeds[0].name} src={image.url} />}
          >
            <Card.Meta
              title={image.breed[0].name}
              description={image.breeds[0].temperament}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Breed
