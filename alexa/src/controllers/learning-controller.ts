import * as express from 'express';
import { interfaces, controller, httpGet } from 'inversify-express-utils';
import { injectable } from 'inversify';
//import * as faker from 'faker';

@controller('/learn')
@injectable()
export class LearningController implements interfaces.Controller {

    private words:string[] = [];
    constructor() {
        this.words = ['aardvark','addax','alligator','alpaca','anteater','antelope','aoudad','ape',
        'argali','armadillo','ass','baboon','badger','basilisk','bat','bear','beaver','bighorn',
        'bison','boar','budgerigar','buffalo','bull','bunny','burro','camel','canary','capybara',
        'cat','chameleon','chamois','cheetah','chimpanzee','chinchilla','chipmunk','civet',
        'coati','colt','cony','cougar','cow','coyote','crocodile','crow','deer','dingo','doe',
        'dog','donkey','dormouse','dromedary','duckbill','dugong','eland','elephant','elk',
        'ermine','ewe','fawn','ferret','finch','fish','fox','frog','gazelle','gemsbok','giraffe',
        'gnu','goat','gopher','gorilla','grizzly bear','ground hog','guanaco','hamster','hare',
        'hartebeest','hedgehog','hippopotamus','hog','horse','hyena','ibex','iguana','impala',
        'jackal','jaguar','jerboa','kangaroo','kid','kinkajou','kitten','koala','koodoo','lamb',
        'lemur','leopard','lion','lizard','llama','lovebird','lynx','mandrill','mare','marmoset',
        'marten','mink','mole','mongoose','monkey','moose','mouse','mule','musk deer','musk-ox',
        'muskrat','mustang','newt','ocelot','okapi','opossum','orangutan','oryx','otter','ox',
        'panda','panther','parakeet','parrot','peccary','pig','platypus','pony','porcupine',
        'porpoise','pronghorn','puma','puppy','quagga','rabbit','raccoon','ram','rat','reindeer',
        'reptile','rhinoceros','roebuck','salamander','seal','sheep','shrew','skunk','sloth','snake',
        'springbok','squirrel','stallion','steer','tapir','tiger','toad','turtle','vicuna','walrus',
        'warthog','waterbuck','weasel','whale','wildcat','wolf','wolverine','wombat','woodchuck',
        'xylophone','yak','zebra','zebu'];
    }
    
    @httpGet('/words/:letter')
    public async monitor(request: express.Request, response: express.Response) {
        
        try {
            response.setHeader('Content-Type', 'application/json');
            let letter = request.params.letter || '';
            letter = letter.toLowerCase();
            console.log(`getting words that start with ${letter}`);
            let letterWords = this.words.filter( x => x.substring(0,1).toLowerCase() === letter);
            response.send(letterWords);
        } catch (err) {
            console.log(err);
            response.sendStatus(500);
        }
    }
}
