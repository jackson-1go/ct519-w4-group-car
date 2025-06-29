import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

import CarForm from './components/CarForm';
// ตอนนี้ยังไม่ใช้ API จริง
// import { getCars, createCar, updateCar, deleteCar } from './services/api';

const App = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [key, setKey] = useState('add'); // สำหรับเลือกแท็บ

  const load = async () => {
    // ใช้ mock data แทนเรียกจาก backend
    const mockData = [
      {
        id: 1,
        brand: "BMW",
        model: "750e",
        startYear: 2023,
        imageUrl: "https://thumbor.roddonjai.com/unsafe/351x197/media.roddonjai.com/CAR/CAR202503280110_BMW_750e_20250328_141209866_WATERMARK"
      },
      {
        id: 2,
        brand: "Honda",
        model: "City Turbo",
        startYear: 2023,
        imageUrl: "https://media.roddonjai.com/CAR/CAR202504120036_Honda_City%20Turbo_20250412_142221643_WATERMARK"
      },
      {
        id: 3,
        brand: "Toyota",
        model: "Yaris",
        startYear: 2023,
        imageUrl: "https://thumbor.roddonjai.com/unsafe/351x197/media.roddonjai.com/CAR/CAR202504230030_Toyota_Yaris_20250423_103529061_WATERMARK"
      },
      {
        id: 4,
        brand: "MG",
        model: "MG5",
        startYear: 2022,
        imageUrl: "https://media.roddonjai.com/CAR/CAR202504180025_MG_MG5_20250418_095729554_WATERMARK"
      },
      {
        id: 5,
        brand: "Suzuki",
        model: "Swift",
        startYear: 2022,
        imageUrl: "https://media.roddonjai.com/CAR/CAR202504080064_Suzuki_Swift_20250408_115610612_WATERMARK"
      }
    ];

    setCars(mockData);
  };


  useEffect(() => {
    load();
  }, []);

  const handleSave = async (car) => {
    if (car.id) {
      // แก้ไขข้อมูลรถ
      setCars((prevCars) =>
        prevCars.map((c) => (c.id === car.id ? { ...car } : c))
      );
      setShowEditModal(false);
    } else {
      // เพิ่มรถใหม่ → สร้าง id จำลอง
      const newCar = {
        ...car,
        id: Date.now(), // สร้าง id จาก timestamp
      };
      setCars((prevCars) => [...prevCars, newCar]);
    }

    setEditingCar(null);
    setKey("list"); // ย้ายไปยังแท็บรายการรถ
  };


  const handleDelete = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };


  const handleEditClick = (car) => {
    setEditingCar(car);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setEditingCar(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">รถยนต์มือสอง</h1>

      <Tabs
        id="car-management-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="add" title="เพิ่มรถใหม่">
          <CarForm onSave={handleSave} />
        </Tab>

        <Tab eventKey="list" title="รายการรถ">
          <div className="row">
            {cars.map((car, index) => (
              <div className="col-md-3 mb-4" key={car.id}>
                <div className="card position-relative h-100">
                  {/* ไอคอนดินสอ */}
                  <FaEdit
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '32px',  // เลื่อนขวานิดนึงให้ไม่ชนกับปุ่มลบ
                      cursor: 'pointer',
                      color: '#007bff',
                      zIndex: 10,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '4px'
                    }}
                    size={18}
                    onClick={() => handleEditClick(car)}
                    title="แก้ไขข้อมูลรถ"
                  />

                  {/* ปุ่มลบ */}
                  <FaTrash
                    onClick={() => handleDelete(car.id)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      cursor: 'pointer',
                      color: 'red',
                      zIndex: 10,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '4px'
                    }}
                    size={18}
                    title="ลบข้อมูลรถ"
                  />


                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="card-img-top"
                    style={{ height: '120px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-2 text-center">
                    <h6 className="card-title mb-1">{car.brand}</h6>
                    <p className="card-text mb-0">{car.model}</p>
                    <small className="text-muted">ปี {car.startYear}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>

      </Tabs>

      {/* Modal แก้ไข */}
      <Modal show={showEditModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลรถยนต์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarForm onSave={handleSave} editingCar={editingCar} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            onClick={() => document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          >
            บันทึก
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default App;
