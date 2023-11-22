const sortArr = (arr: any[]) => {
  const res = []
  let copy = [...arr]

  for(let i=0; i<arr.length; i++) {
    const idx = Math.floor(Math.random() * (copy.length - 1))
    res.push(copy[idx])
    copy = [...copy.slice(0,idx),...copy.slice(idx+1)]
  }
  return res
}

export { sortArr }