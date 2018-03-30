<?php

class DataBase extends SQLite3
{

    function __construct()
    {
        parent::__construct("protected/bd.bd");
    }

    private function createResearch(string $res)
    {
        $pre = $this->prepare('insert into researches values(:res, :weight)');
        $pre->bindValue(':res', $res, SQLITE3_TEXT);
        $pre->bindValue(':weight', 1, SQLITE3_INTEGER);
        $pre->execute()->finalize();
    }

    function addResearch(string $res)
    {
        if (! $this->exist($res)) {
            $this->createResearch($res);
        } else {
            $pre = $this->prepare('update researches set weight=:w where name=:res');
            $pre->bindValue(':res', $res, SQLITE3_TEXT);
            $pre->bindValue(':w', $this->getWeight($res) + 1, SQLITE3_INTEGER);
            $pre->execute()->finalize();
        }
    }

    function exist(string $res): bool
    {
        $pre = $this->prepare('select count(*) from researches where name=:res');
        $pre->bindValue(':res', $res, SQLITE3_TEXT);
        $result = $pre->execute();
        return $result->fetchArray()[0] != 0;
    }

    function getWeight(string $res): int
    {
        $pre = $this->prepare('select weight from researches where name=:res');
        $pre->bindValue(':res', $res, SQLITE3_TEXT);
        $result = $pre->execute();
        $weight = $result->fetchArray()["weight"];
        $result->finalize();
        return is_null($weight) ? 0 : $weight;
    }

    function getByWeight(string $term)
    {
        $pre = $this->prepare("select name from researches where name like :term order by weight desc");
        $pre->bindValue(':term', $term . "%", SQLITE3_TEXT);
        $result = $pre->execute();
        $arr = [];
        while ($tmp = $result->fetchArray(SQLITE3_NUM)) {
            $arr[] = $tmp[0];
        }
        
        $result->finalize();
        return $arr;
    }
}

?>