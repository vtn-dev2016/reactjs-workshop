
use ui from https://ant.design/<br/>
docker sqlserver from https://hub.docker.com/r/paramat/meetup-warehouse<br/>
nodejs backend from https://github.com/jirayuth289/warehouse.git<br/>
## How to run<br/>
git clone https://github.com/jirayuth289/warehouse.git<br/>
cd warehouse<br/>
npm install<br/>
npm start<br/>
cd ~<br/>
please install docker engine and run 
"docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@ssw0rd' -p 1433:1433 --name sql1 -d paramat/meetup-warehouse:1.1"<br/>
cd ~<br/>
git clone https://github.com/vtn-dev2016/reactjsMeetup.git<br/>
cd reactjsMeetup<br/>
npm install<br/>
npm start
