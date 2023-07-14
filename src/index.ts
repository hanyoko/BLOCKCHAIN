//블록체인 만들기

//console.log("bye");

import crypto from "crypto";

//interface 사용
interface BlockShape {
//BlockShape의 값
    //해쉬 값
    hash: string;
    //이전 해쉬 값
    prevHash: string;
    //height 블럭의 위치
    height: number;
    //블럭이 보호할 데이터
    data: string;
}

//Block class 만들기
//hash 값을 설정하지 않으면 오류 발생
class Block implements BlockShape {
    public hash: string;    //hash 값을 설정하면 Block class는 인터페이스를 제대로 이용하지만, hash 변수를 초기하해줘야한다.
    //블럭을 생성
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        //hash 변수 초기화
        //this.hash 를 적어주고, static 함수를 호출한다.
        //static 함수 :
        //- 객체지향 프로그래밍에서 많이 사용
        //- 클래스 인스턴스가 없어도 부를 수 있는 함수 
                //데이터를 받는다.
        this.hash = Block.calculateHash(prevHash, height, data);
                        //calculateHash를 호출할 수 없는데, Block. 을 붙여주면 된다.
    }
    static calculateHash(prevHash: string, height: number, data: string) {
        //데이터의 해쉬값은 여기서 생성
        const toHash = `${prevHash}${height}${data}`
        return crypto.createHash("sha256").update(toHash).digest("hex");
        //crypto.createHash를 사용 / sha256 방식을 사용
        //update()를 불러서 toHash의 해쉬값을 구한다. 
        //digest를 입력하면 사용할 수 있는 값이 자동완성된다.
        //hex을 사용해준다. 끝 !
        //성공적으로 블럭을 생성 중이다.
    }    
}

//hash 값 설정
/*
123 => ;lajflsdflsdnlaskd45aakjdllafjao46   //해쉬값 문자열 생성
1234 => ;fjsfiowejfiowj4rsdjfiosdfjw0ffs5   //값을 바꾸면 해쉬값 또한 완전히 다른 문자열값으로 변경된다.
*/
//hash의 장점은 이상하게 생긴 데이터 표시이면서 결정론적이라는 것
//데이터가 변하지 않으면 해쉬값도 변하지 않는다는 것.
//이것이 블록체인에서 블록을 보호하는 방법.
//이걸 이용하면 블록체인의 블록정보가 수정되지 않았다는 것을 확인할 수 있다 !


class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    //이전 해쉬값을 불러올 수 있는 private 함수 getPrevHash()
    private getPrevHash(){
        //만약 블럭의 길이가 0이라면 첫번째 해쉬가 없기 때문에 ""을 리턴
        if(this.blocks.length === 0) return "";
        //만약 그게 아니면 마지막 블럭의 해쉬값을 리턴
        return this.blocks[this.blocks.length - 1].hash;
    }
    //새로운 블럭을 추가할 때는 블럭에 저장하고 싶은 데이터를 보내줘야한다.
    public addBlock(data: string){
        const newBlock = new Block(
            //새로운 블럭을 생성하려면 이전 해쉬값인 prevHash가 필요하다.
            this.getPrevHash(),
            this.blocks.length + 1,
            data
            //이제 새로운 블럭이 완성되었다.
            );
            //생성된 블럭을 push 하여 newBlock 배열에 넣어준다.
            this.blocks.push(newBlock);
    }
    //블럭에 접근할 수 있는 함수
    public getBlocks() {
        //return this.blocks;   해킹을 방지하기 위해 수정
        //배열 안에 있는 데이터를 가진 새로운 배열을 리턴해준다.
        return [...this.blocks];
    }
}

//새로운 블럭체인 생성
const blockchain = new BlockChain();

//새로운 블럭체인 추가
blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

blockchain.getBlocks().push(new Block("xxxxxx", 111111, "HACKEDDDDD"))

console.log(blockchain.getBlocks());