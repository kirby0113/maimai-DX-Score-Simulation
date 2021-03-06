import { Tap, Hold, Slide, Touch, Break, BreakBonus } from '../constants/classicScore';

interface ScorePointDetail {
  evaluation: string; //判定名
  sum: number; //その判定を獲得したノーツ数
}

interface ScorePoint {
  notesName: string; //ノーツ名
  total: number; //そのノーツの総数
  detail: ScorePointDetail[]; //判定の獲得数詳細
}

//全ノーツの最高点の合計
export const maxScoreCalc = (scorePoint: ScorePoint) => {
  switch (scorePoint.notesName) {
    case 'tap': {
      return Tap['criticalPerfect'] * scorePoint.total;
    }
    case 'hold': {
      return Hold['criticalPerfect'] * scorePoint.total;
    }
    case 'slide': {
      return Slide['criticalPerfect'] * scorePoint.total;
    }
    case 'touch': {
      return Touch['criticalPerfect'] * scorePoint.total;
    }
    case 'break': {
      return Break['lowPerfect'] * scorePoint.total;
    }
    default: {
      alert('スコアに異常がある可能性があります。');
      return 0;
    }
  }
};

//該当ノーツの各判定ごとの合計点
export const detailScoreCalc = (scoreDetail: ScorePointDetail, notesName: string) => {
  switch (notesName) {
    case 'tap': {
      return Tap[scoreDetail.evaluation] * scoreDetail.sum;
    }
    case 'hold': {
      return Hold[scoreDetail.evaluation] * scoreDetail.sum;
    }
    case 'slide': {
      return Slide[scoreDetail.evaluation] * scoreDetail.sum;
    }
    case 'touch': {
      return Touch[scoreDetail.evaluation] * scoreDetail.sum;
    }
    case 'break': {
      return Break[scoreDetail.evaluation] * scoreDetail.sum;
    }
    default: {
      console.error('スコアに異常がある可能性があります。');
      return 0;
    }
  }
};

export const totalBreakBonusCalc = (scorePoint: ScorePoint) => {
  return scorePoint.detail.reduce(
    (previousScore: number, currentDetail: ScorePointDetail) =>
      previousScore + BreakBonus[currentDetail.evaluation] * currentDetail.sum,
    0
  );
};

export const maxBreakBonusCalc = (scorePoint: ScorePoint) => {
  return BreakBonus['criticalPerfect'] * scorePoint.total;
};

//各ノーツの合計獲得点
export const totalScoreCalc = (scorePoint: ScorePoint) => {
  return scorePoint.detail.reduce(
    (previousScore: number, currentDetail: ScorePointDetail) =>
      previousScore + detailScoreCalc(currentDetail, scorePoint.notesName),
    0
  );
};

export const classicScoreCalc = (scorePoints: ScorePoint[]) => {
  let maxScore = scorePoints.reduce(
    (previousPoint: number, currentPoint: ScorePoint) => previousPoint + maxScoreCalc(currentPoint),
    0
  );

  let totalScore = scorePoints.reduce(
    (previousPoint: number, currentPoint: ScorePoint) =>
      previousPoint + totalScoreCalc(currentPoint),
    0
  );

  let totalBreakBonus = scorePoints.reduce((previousPoint: number, currentPoint: ScorePoint) => {
    if (currentPoint.notesName === 'break') {
      return previousPoint + totalBreakBonusCalc(currentPoint);
    } else {
      return previousPoint;
    }
  }, 0);

  let maxBreakBonus = scorePoints.reduce((previousPoint: number, currentPoint: ScorePoint) => {
    if (currentPoint.notesName === 'break') {
      return previousPoint + maxBreakBonusCalc(currentPoint);
    } else {
      return previousPoint;
    }
  }, 0);

  return {
    max: maxScore,
    total: totalScore,
    maxBreakBonus: maxBreakBonus,
    totalBreakBonus: totalBreakBonus,
  };
};
