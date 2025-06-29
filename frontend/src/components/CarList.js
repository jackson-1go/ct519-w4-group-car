import React from 'react';
import { Link } from 'react-router-dom';

const CarList = ({ cars, onDelete, onEdit }) => {
  return (
    <div className="row">
      {cars.map((car) => (
        <div className="col-md-4 mb-3" key={car.id}>
          <div className="card h-100">
            <Link to={`/cars/${car.id}`}>
              <img src={car.imageUrl} className="card-img-top" alt={`${car.brand} ${car.model}`} />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {car.brand} {car.model}
                </Link>
              </h5>
              <p className="card-text">ปีที่เริ่มจำหน่าย: {car.startYear}</p>
              <button className="btn btn-warning me-2" onClick={() => onEdit(car)}>แก้ไข</button>
              <button className="btn btn-danger" onClick={() => onDelete(car.id)}>ลบ</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
