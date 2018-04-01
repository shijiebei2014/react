import * as urllib from 'urllib'
import * as cheerio from 'cheerio'
import City from '../models/rent/city'
let get_domain = async function () {
    let URL = "http://www.58.com/changecity.aspx";

    let retObj = await urllib.request(URL, {type: 'GET'})

    if (retObj.status == 200) {
        let content = retObj
            .data
            .toString()
        const $ = cheerio.load(content)
        let dds = $('#clist').find('dd');
        console.log(`dds: ${dds.length}`);
        console.log(dds.length)

        var promises = [];
        for (var index = 1; index < dds.length; index++) { //获得省份和城市
            //console.log(index)
            var dd = dds.eq(index);
            //console.log(dd)
            var cities = dd.children('a')
            var province = dd
                .prev()
                .text();
            if (province == '其他') {} else if (province == '海外') {} else {
                //console.log(`${province}`);
                cities
                    .each(function (i) {
                        var city = $(this);
                        var city_name = city
                            .text()
                            .trim()
                        var href = city
                            .attr('href')
                            .trim()
                        //console.log(`\t${city_name}---${href}`)
                        promises.push(City.findOrCreate({
                            where: {
                                cityName: city_name
                            },
                            defaults: {
                                provinceName: province,
                                _58_domain: href
                            }
                        }))
                    })
            }

        }
        await City.sync({force: false})
        console.log(123)
        await Promise.all(promises)

        console.log('完成')
    }
}

get_domain().catch(function(err) {
    console.log(err)
});