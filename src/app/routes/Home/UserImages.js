import React from "react";

import Aux from "../../../util/Auxiliary.js"

const userImageList = [
  {
    id: 1,
    image: 'https://scontent.ftun1-1.fna.fbcdn.net/v/t1.0-9/60788307_2365453367016442_7325536150368550912_n.jpg?_nc_cat=102&_nc_oc=AQnKXxBLRgtyNc1S6e3WmCRADjOKSc4jSYhAK8bQDhO97U_fN-zE8jj6TVtfjXYpX9g&_nc_ht=scontent.ftun1-1.fna&oh=dec0d2dfd3a3dcab95b2d7b6c9d3959c&oe=5DF4BF02',
    name: 'Alaaeddine Ouni',
    rating: 'Moyenne : 19,80',
    deals: ''
  },
  {
    id: 2,
    image: 'https://scontent.fnbe1-1.fna.fbcdn.net/v/t1.0-9/56558620_10211184286002435_7388198254338375680_n.jpg?_nc_cat=107&_nc_oc=AQmb3LGTGNTkej0Lei9pRRxARqBRBPkcFkVnnwX6ljQb9aWuGbWNGJ64aSBXJEHTmsY&_nc_ht=scontent.fnbe1-1.fna&oh=b09a8647fbf7da9dfac8c28235e16794&oe=5E3B915B',
    name: 'Kais Hlioui',
    rating: 'Moyenne : 18,44',
    deals: '21 Deals'
  },
  {
    id: 3,
    image: 'https://scontent.fnbe1-1.fna.fbcdn.net/v/t1.0-0/p206x206/12974533_1791361377764308_7976040541836103932_n.jpg?_nc_cat=102&_nc_oc=AQkxvpPpRXUQoaXNTy0VP7tkncak4WbYbGo28_IBbXjUqWOfDC3_eYr-iQLRkmaWyTk&_nc_ht=scontent.fnbe1-1.fna&oh=64bddd4160d00d9cfde21ed321196622&oe=5DEF3C04',
    name: 'Chokri Belhadi',
    rating: 'Moyene : 18,02',
    deals: ''
  },
  {
    id: 4,
    image: 'https://scontent.ftun9-1.fna.fbcdn.net/v/t1.0-9/49810336_2809918089022137_8350197531946254336_n.jpg?_nc_cat=107&_nc_oc=AQnJzJJpc4I43ialI9-nVqogj7LIapATczpzv_BWGkc1Ltt8XLVq8hkt6HTvx83R9xM&_nc_ht=scontent.ftun9-1.fna&oh=d4cdcd891fe352145525fcf42cb2071c&oe=5DF326BC',
    name: 'Ghasen Gharbi',
    rating: 'Moyenne : 17,88',
    deals: ''
  },
  {
    id: 5,
    image: 'https://scontent.ftun9-1.fna.fbcdn.net/v/t1.0-9/64322190_10219096548430428_4903208890738409472_n.jpg?_nc_cat=109&_nc_oc=AQkbjIcdzN5wESchKSTQCr_nEiUjUfybc_HhRC67uzZzaMf-sDDK-udta_xmg2uVLCw&_nc_ht=scontent.ftun9-1.fna&oh=b38026423cf1693b63fd900c377f2d64&oe=5DFC7936',
    name: 'Sabri Ouni',
    rating: 'Moyenne : 17,50',
    deals: ''
  },
]


const UserImages = () => {
  return (
    <Aux>
      <h2 className="jr-entry-title d-flex flex-row">Les élèves de l'élite scolaire 
        <span className="text-primary jr-font-weight-medium jr-fs-md pointer ml-auto d-none d-sm-block">Go to agents list <i
          className="zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"/></span></h2>

      <ul className="jr-agents-list">
        {userImageList.map((user, index) =>
          <li key={index}>
            <div className="jr-profileon">
              <div className="jr-profileon-thumb"><img alt="..." src={user.image}/></div>
              <div className="jr-profileon-content">
                <h5 className="mb-0 text-truncate">{user.name}</h5>
                <p className="mb-0 jr-fs-sm text-truncate"><i className={`zmdi zmdi-star text-orange`}/> {user.rating}
                  <span>|</span> {user.deals}
                </p>
              </div>
            </div>
          </li>
        )
        }
      </ul>
      <span className="text-primary jr-font-weight-medium jr-fs-md pointer mb-3 d-block d-sm-none">Go to agents list <i
        className="icon icon-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"/></span>

    </Aux>
  );
};

export default UserImages;
