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
    try {
      const response = await fetch("http://localhost:2010/api/cars");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // เพิ่ม image
      const carsWithimage = data.map(car => ({
        ...car,
        image: car.image
          ? `http://localhost:2010/uploads/cars/${car.image}`
          : null
      }));

      setCars(carsWithimage);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (formData) => {
    try {
      let response;

      if (editingCar?.id) {
        response = await fetch(`http://localhost:2010/api/cars/${editingCar.id}`, {
          method: "PUT",
          body: formData,
        });
        if (!response.ok) throw new Error(`Update failed: ${response.status}`);
        const updatedCar = await response.json();
        setCars((prevCars) =>
          prevCars.map((c) => (c.id === updatedCar.id ? updatedCar : c))
        );
      } else {
        response = await fetch("http://localhost:2010/api/cars", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error(`Create failed: ${response.status}`);
        const newCar = await response.json();
        setCars((prevCars) => [...prevCars, newCar]);
      }

      await load();

      setEditingCar(null);
      setShowEditModal(false);
      setKey("list");
    } catch (error) {
      console.error("Error saving car:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกรถ");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("คุณต้องการลบรถคันนี้หรือไม่?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:2010/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`ลบไม่สำเร็จ: ${response.status}`);
      }

      // ลบใน state เมื่อ API สำเร็จ
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("เกิดข้อผิดพลาดในการลบรถ");
    }
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
                    src={car.image}
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

        <Tab eventKey="profile" title="ข้อมูลผู้ติดต่อ">
          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <div className="card h-100 text-center">
                <img
                  src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/491594165_1856842875065188_647366527083552581_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHml4x5LsfCeKMlf54FqriDv05dPNwqmqi_Tl083CqaqIh5e8xIZx9IAOth4hAvGmkWs9UV0GvFsRXT0INLBi5l&_nc_ohc=ipQos8agh0kQ7kNvwHpnBsG&_nc_oc=AdkiDfkRZPXu2-yUx3615mduB4K-rfM2QimQ2YTeXwGUx7_B8Ln0IhQUEiKPr39JXLE&_nc_zt=23&_nc_ht=scontent.fbkk6-1.fna&_nc_gid=sCnlGQ5-oGeRCtKvmV1hcA&oh=00_AfMD_-xDuCyfZYnvHjj_byjeMqFI6zIpIVSlAIWEQMZSgA&oe=6866BA29"
                  alt="ผู้จัดทำคนที่ 1"
                  className="card-img-top mx-auto"
                  style={{ width: "150px", borderRadius: "50%", marginTop: "15px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">นายเวงกวง แต (แจ็ค)</h5>
                  <p className="card-text">นักพัฒนาระบบ</p>
                  <p className="card-text"><small className="text-muted">รหัสนักศึกษา: 67130397</small></p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100 text-center">
                <img
                  src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/336770703_212754278075210_1296293011194265980_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE34Xv-jO5KsKhb-CvJ7vdiWqtRf5ftdkJaq1F_l-12Qmz5Vv5fQto4OU-rhNNg8RAle2tkOX-JNeNM6ngfJtP6&_nc_ohc=m7Lm7WqzyawQ7kNvwE1cKae&_nc_oc=AdkRGjurPR7VhoQ6fPGGqXZWrJKpWM2Ytq1iDEhEvDOUj9NhpgW2XC6j-aD0OEfeDo4&_nc_zt=23&_nc_ht=scontent.fbkk6-1.fna&_nc_gid=KxpHOQjSEtIBvrKpxGm0Og&oh=00_AfND6d8Eg2FwhFFnOdfrRM76-Qk_tRVBJ-n_Tsa6YLgeZA&oe=6866CCC8"
                  alt="ผู้จัดทำคนที่ 2"
                  className="card-img-top mx-auto"
                  style={{ width: "150px", borderRadius: "50%", marginTop: "15px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">นางสาวศุภดา สุทธา (ครีม)</h5>
                  <p className="card-text">นักออกแบบ UI</p>
                  <p className="card-text"><small className="text-muted">รหัสนักศึกษา: 67130709</small></p>
                </div>
              </div>
            </div>
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
