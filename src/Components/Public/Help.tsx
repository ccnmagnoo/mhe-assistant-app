import { Alert } from '@material-ui/lab';
import React from 'react';
import Button from '@material-ui/core/Button';
import { IClassroom } from '../../Models/Classroom.interface';
import { LandType } from '../../Functions/GetTerritoryList';

//external files to upload
//import roomsddbb from '../../Config/mhe-data-rooms.json';
//import cvn02000 from '../../Config/mhe-data-benefit-02000.json';
//import cvn04000 from '../../Config/mhe-data-benefit-04000.json';
//import cvn06000 from '../../Config/mhe-data-benefit-06000.json';
//import cvn08000 from '../../Config/mhe-data-benefit-08000.json';
//import cvn10000 from '../../Config/mhe-data-benefit-10000.json';
//import cvn12000 from '../../Config/mhe-data-benefit-12000.json';
//import cvn14000 from '../../Config/mhe-data-benefit-14000.json';
//import cvn16000 from '../../Config/mhe-data-benefit-16000.json';
//import cvn18000 from '../../Config/mhe-data-benefit-18000.json';
//import cvn20000 from '../../Config/mhe-data-benefit-20000.json';
//import cvn22000 from '../../Config/mhe-data-benefit-22000.json';
//import cvn24000 from '../../Config/mhe-data-benefit-22000.json';
//import cvn26000 from '../../Config/mhe-data-benefit-26000.json';
//import cvn28000 from '../../Config/mhe-data-benefit-28000.json';
//import cvnToFix from '../../Config/mhe-data-benefit-toFix.json';
import { refUuid } from '../../Config/credential';
import { db } from '../../Config/firebase';
import { IBeneficiary } from '../../Models/Beneficiary.interface';
import { Gender } from '../../Models/Person.Interface';

type RoomJson = {
  city: string;
  dataInstance: string;
  dir: string;
  colaborator: string;
  uuid: string;
  idcal: string;
};
type ConsolidatedJson = {
  reg: string;
  puuid: string;
  firstName: string;
  fatherName: string;
  motherName: string;
  rut: string;
  dir: string;
  dateBenefit: string;
  city: string;
  gender: string;
  idCal: string;
  uuidRoom: string;
};

export const Help = () => {
  //room database
  //const roomDatabase = roomsddbb.classrooms; /*rooms ddbb*/
  const cvn: ConsolidatedJson[][] = [
    //cvn02000,
    //cvn04000,
    //cvn06000,
    //cvn08000,
    //cvn10000,
    //cvn12000,
    //cvn14000,
    //cvn16000,
    //cvn18000,
    //cvn20000,
    //cvn22000,
    //cvn24000,
    //cvn26000,
    //cvn28000,
    //cvnToFix,
  ];

  function uploadRooms() {
    console.log('upload click');
    console.log(
      'size of rooms list',
      roomDatabase.length,
      'size of consolidated list',
      cvn.length
    );

    const roomsToFirestore = async () => {
      for (let i = 0; i < roomDatabase.length; i++) {
        console.count('data room to upload');
        //conver to IClassroom
        const rum: RoomJson = roomDatabase[i];
        const itDate = new Date(rum.dataInstance);
        const classroom: IClassroom = {
          uuid: rum.uuid,
          idCal: rum.idcal,
          dateInstance: itDate,
          enrolled: [],
          attendees: [],
          placeActivity: { name: 'no-data', dir: rum.dir, date: itDate },
          placeDispatch: { name: 'no-data', dir: rum.dir, date: itDate },
          allowedCities: [rum.city],
          cityOnOp: rum.city,
          colaborator: rum.colaborator,
          land: { type: LandType.city, name: rum.city },
        };

        //get person in repository with this on site classroom
        cvn.forEach((params) => {
          params.forEach((person) => {
            if (person.uuidRoom === classroom.uuid) {
              classroom.attendees.push(person.puuid);
              classroom.enrolled.push(person.puuid);
            }
          });
        });

        //upload to firebase:
        console.log(
          'build clasroom',
          classroom.idCal,
          'attendees',
          classroom.attendees.length
        );
        try {
          await db
            .collection(`Activity/${refUuid}/Classroom`)
            .doc(classroom.uuid)
            .set(classroom);
          console.log('load success', classroom.idCal);
        } catch (error) {
          console.log('load fail', classroom.idCal);
        }
      }
    };
    roomsToFirestore();
    console.countReset('data room to upload');
  }

  function uploadPeople() {
    const physicalSign = `<svg
      width="396.5"
      height="200"
      version="1.1"
      id="svg6"
      sodipodi:docname="signsvg.svg"
      inkscape:version="1.1 (c68e22c387, 2021-05-23)"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
     <defs
        id="defs10" />
     <sodipodi:namedview
        id="namedview8"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageshadow="2"
        inkscape:pageopacity="0.0"
        inkscape:pagecheckerboard="0"
        showgrid="false"
        inkscape:snap-text-baseline="true"
        inkscape:zoom="1.7994956"
        inkscape:cx="80.855992"
        inkscape:cy="143.09566"
        inkscape:window-width="1920"
        inkscape:window-height="986"
        inkscape:window-x="-11"
        inkscape:window-y="-11"
        inkscape:window-maximized="1"
        inkscape:current-layer="svg6" />
     <text
        xml:space="preserve"
        style="font-size:14.6667px;line-height:1.25;font-family:'Arial Rounded MT Bold';-inkscape-font-specification:'Arial Rounded MT Bold, ';fill:#b4b4d3;stroke:none;stroke-opacity:1;fill-opacity:1"
        x="179.42964"
        y="96.082672"
        id="text3151"><tspan
          sodipodi:role="line"
          id="tspan3149"
          x="179.42964"
          y="96.082672"
          style="font-size:14.6667px;fill:#b4b4d3;stroke:none;stroke-opacity:1;fill-opacity:1">firma</tspan><tspan
          sodipodi:role="line"
          x="179.42964"
          y="114.41605"
          id="tspan3153"
          style="font-size:14.6667px;fill:#b4b4d3;stroke:none;stroke-opacity:1;fill-opacity:1">fisica</tspan></text>
     <rect
        style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#d1d2e4;stroke-width:7.29406;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke markers fill"
        id="rect13367"
        width="77.156387"
        height="63.819317"
        x="159.67181"
        y="68.09034" />
   </svg>
   `;
    console.log('upload people click');
    console.log('size of consolidated people list', cvn.length);

    const uploadPeopleToFirebase = async () => {
      try {
        //for each item on json file repository
        cvn.forEach((list) => {
          list.forEach((person) => {
            //build <IBeneficiary>
            console.log('preparin to upload: ', person.rut);
            const itDate = new Date(person.dateBenefit);
            const itGender = person.gender as Gender;
            const beneficiary: IBeneficiary = {
              uuid: person.puuid,
              name: {
                firstName: person.firstName,
                fatherName: person.fatherName,
                motherName: person.motherName,
              },
              rut: person.rut,
              classroom: {
                idCal: person.idCal,
                uuid: person.uuidRoom,
                dateInstance: itDate,
              },
              gender: itGender,
              dateUpdate: itDate,
              email: 'no-data',
              phone: 'no-data',
              address: { dir: person.dir, city: person.city },
              sign: physicalSign,
              dateSign: itDate,
            };
            //upload to firebase
            const ref = db
              .collection(`Activity/${refUuid}/Consolidated`)
              .doc(beneficiary.uuid);
            ref.set(beneficiary);
            console.count('success on person');
          });
        });
      } catch (error) {
        console.log('fail uploading person', error);
      }
    };

    uploadPeopleToFirebase();
    console.countReset('success on person');
  }

  return (
    <React.Fragment>
      <Alert severity='info'>sección en construcción 🚧</Alert>

      <Button variant='text' color='secondary'>
        populate firebase people
      </Button>
    </React.Fragment>
  );
};