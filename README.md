
use ui from https://ant.design/
docker sqlserver from https://hub.docker.com/r/paramat/meetup-warehouse
nodejs backend from https://github.com/jirayuth289/warehouse.git
## How to run
git clone https://github.com/jirayuth289/warehouse.git
cd warehouse
npm install
npm start
cd ~
please install docker engine and run 
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@ssw0rd' -p 1433:1433 --name sql1 -d paramat/meetup-warehouse:1.1
cd ~
git clone https://github.com/vtn-dev2016/reactjsMeetup.git<br/>
cd reactjsMeetup<br/>
npm install<br/>
npm start
