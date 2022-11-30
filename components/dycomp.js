//import 내용 없음

export async function dycomp({ data }) {
  console.log(this.props.data);

  return (
    <ul>
      {data.map((data, index) => {
        <li key={index}>{data.gameid}</li>;
      })}
    </ul>
  );
}

export async function getServerSideProps(context /*매개 변수 뭘 받을지?*/) {
  //이 부분은 달라질 수 있음 - 링크를 통해 데이터를 가져오고 그 데이터 형태는 json 형태
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();
  const data = await context.json();

  return {
    props: {
      // props for your component

      data,
      // gameId: i.gameId.toNumber(),
      // startAt: i.startAt.toNumber(),
      // finishAt: i.finishAt.toNumber(),
      // prize: prize,
      // joinFeeAmount: joinFeeAmount,
      // betFeeAmount: betFeeAmount,
      // gameStatus: i.gameStatus,
    },
  };
}

//Semantic UI react - bootstrap 같은 UI framework인데, React용으로 제작된 것이 있어서
//이를 활용하면 CSS 제작 시 유리할 듯
