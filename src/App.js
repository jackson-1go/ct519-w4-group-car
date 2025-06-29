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
 <Tab eventKey="contact" title="ข้อมูลผู้ติดต่อ">
  <div className="row mt-3">

    <div className="col-md-3 text-center">
      <img
        src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/491594165_1856842875065188_647366527083552581_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHml4x5LsfCeKMlf54FqriDv05dPNwqmqi_Tl083CqaqIh5e8xIZx9IAOth4hAvGmkWs9UV0GvFsRXT0INLBi5l&_nc_ohc=ipQos8agh0kQ7kNvwHpnBsG&_nc_oc=AdkiDfkRZPXu2-yUx3615mduB4K-rfM2QimQ2YTeXwGUx7_B8Ln0IhQUEiKPr39JXLE&_nc_zt=23&_nc_ht=scontent.fbkk6-1.fna&_nc_gid=sCnlGQ5-oGeRCtKvmV1hcA&oh=00_AfMD_-xDuCyfZYnvHjj_byjeMqFI6zIpIVSlAIWEQMZSgA&oe=6866BA29"
        alt="Member 1"
        className="img-fluid rounded-circle mb-2"
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
      <h6>นายเวงกวง แต</h6>
      <p className="mb-1">ชื่อเล่น: แจ็ค</p>
      <small>รหัสนักศึกษา: 67130397</small>
    </div>

    <div className="col-md-3 text-center">
      <img
        src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/336770703_212754278075210_1296293011194265980_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE34Xv-jO5KsKhb-CvJ7vdiWqtRf5ftdkJaq1F_l-12Qmz5Vv5fQto4OU-rhNNg8RAle2tkOX-JNeNM6ngfJtP6&_nc_ohc=m7Lm7WqzyawQ7kNvwE1cKae&_nc_oc=AdkRGjurPR7VhoQ6fPGGqXZWrJKpWM2Ytq1iDEhEvDOUj9NhpgW2XC6j-aD0OEfeDo4&_nc_zt=23&_nc_ht=scontent.fbkk6-1.fna&_nc_gid=KxpHOQjSEtIBvrKpxGm0Og&oh=00_AfND6d8Eg2FwhFFnOdfrRM76-Qk_tRVBJ-n_Tsa6YLgeZA&oe=6866CCC8"
        alt="Member 2"
        className="img-fluid rounded-circle mb-2"
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
      <h6>นางสาวศุภดา สุทธา</h6>
      <p className="mb-1">ชื่อเล่น: ครีม</p>
      <small>รหัสนักศึกษา: 67130709</small>
    </div>

    {/* เพิ่มสมาชิกคนอื่นๆ ตรงนี้ */}

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
